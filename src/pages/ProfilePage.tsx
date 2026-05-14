import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useThemeColor, type ThemeColor } from "@/contexts/ThemeColorContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { 
  User, 
  Mail, 
  LogOut, 
  Trash2, 
  Upload, 
  X, 
  Save,
  Loader2,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Header from "@/components/Header";

const ProfilePage = () => {
  const { user, profile, updateProfile, signOut } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const { themeColor, setThemeColor } = useThemeColor();
  const navigate = useNavigate();

  // Form states
  const [username, setUsername] = useState(profile?.username || "");
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [selectedLanguage, setSelectedLanguage] = useState(profile?.language || lang);
  const [selectedTheme, setSelectedTheme] = useState(profile?.theme_color || themeColor);
  
  // Profile picture states
  const [avatarUrlInput, setAvatarUrlInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // UI states
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setFullName(profile.full_name || "");
      setSelectedLanguage(profile.language || lang);
      setSelectedTheme(profile.theme_color || themeColor);
    }
  }, [profile, lang, themeColor]);

  // Check username availability
  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (!usernameToCheck.trim() || usernameToCheck === profile?.username) {
      setUsernameAvailable(null);
      return;
    }

    setIsUsernameChecking(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", usernameToCheck.trim())
        .maybeSingle();

      if (error) throw error;
      setUsernameAvailable(!data);
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(null);
    } finally {
      setIsUsernameChecking(false);
    }
  };

  // Debounce username check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (username && username !== profile?.username) {
        checkUsernameAvailability(username);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, profile?.username]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a PNG, JPEG, or JPG image");
      return;
    }

    // Validate file size (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Upload profile picture
  const handleUploadPicture = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);
    try {
      // Upload to Supabase storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      // Update profile with new URL
      const { error: updateError } = await updateProfile({
        avatar_url: data.publicUrl,
      });

      if (updateError) throw updateError;

      setSelectedFile(null);
      setPreviewUrl(null);
      toast.success("Profile picture updated successfully!");
    } catch (error: any) {
      console.error("Error uploading picture:", error);
      toast.error(error.message || "Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  // Set avatar from URL
  const handleSetAvatarUrl = async () => {
    if (!avatarUrlInput.trim() || !user) return;

    setIsUploading(true);
    try {
      const { error } = await updateProfile({ avatar_url: avatarUrlInput.trim() });
      if (error) throw error;

      setAvatarUrlInput("");
      toast.success("Profile picture updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  // Delete profile picture
  const handleDeletePicture = async () => {
    if (!user) return;

    try {
      const { error } = await updateProfile({ avatar_url: null });
      if (error) throw error;

      setPreviewUrl(null);
      setSelectedFile(null);
      toast.success("Profile picture deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete profile picture");
    }
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!user) return;

    // Validate username
    if (username !== profile?.username && usernameAvailable === false) {
      toast.error("Username is already taken");
      return;
    }

    setIsSaving(true);
    try {
      const updates: any = {
        full_name: fullName.trim(),
        language: selectedLanguage,
        theme_color: selectedTheme,
      };

      // Only update username if it changed and is available
      if (username.trim() && username !== profile?.username) {
        updates.username = username.trim();
      }

      const { error } = await updateProfile(updates);
      if (error) throw error;

      // Update theme and language in context
      setLang(selectedLanguage as "en" | "fr");
      setThemeColor(selectedTheme as ThemeColor);

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      // Delete profile picture from storage if exists
      if (profile?.avatar_url && profile.avatar_url.includes('profile-pictures')) {
        try {
          const urlParts = profile.avatar_url.split("/");
          const fileName = urlParts[urlParts.length - 1];
          await supabase.storage.from("profile-pictures").remove([fileName]);
        } catch (err) {
          console.warn("Failed to delete profile picture from storage:", err);
        }
      }

      // Delete user from auth.users table using RPC function
      // Note: You need to create this function in Supabase
      const { error: rpcError } = await supabase.rpc('delete_user');
      
      if (rpcError) {
        console.error("RPC delete failed:", rpcError);
        // Fallback: Just sign out the user
        // The account will remain but user is logged out
        await signOut();
        toast.info("Signed out successfully. Please contact support to delete your account.");
        navigate("/auth");
        return;
      }

      toast.success("Account deleted successfully");
      await signOut();
      navigate("/auth");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      toast.error(error.message || "Failed to delete account");
      // Still sign out on error
      await signOut();
      navigate("/auth");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          {/* Profile Picture Section */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Profile Picture
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar Preview */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted flex items-center justify-center">
                  {previewUrl || profile?.avatar_url ? (
                    <img 
                      src={previewUrl || profile?.avatar_url || ""} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || user.email || "U")}&background=random&size=128`;
                      }}
                    />
                  ) : (
                    <User className="w-16 h-16 text-muted-foreground" />
                  )}
                </div>
                
                {(profile?.avatar_url || previewUrl) && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeletePicture}
                    className="rounded-lg"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Picture
                  </Button>
                )}
              </div>

              {/* Upload Options */}
              <div className="flex-1 space-y-4 w-full">
                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload from device</label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleFileSelect}
                      className="flex-1"
                    />
                    {selectedFile && (
                      <Button
                        onClick={handleUploadPicture}
                        disabled={isUploading}
                        className="rounded-lg"
                      >
                        {isUploading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPEG, JPG - Max 2MB</p>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Or paste image URL</label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={avatarUrlInput}
                      onChange={(e) => setAvatarUrlInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSetAvatarUrl}
                      disabled={isUploading || !avatarUrlInput.trim()}
                      className="rounded-lg"
                    >
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Set"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Account Information
            </h2>

            <div className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Choose a unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full"
                  />
                  {isUsernameChecking && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                  {!isUsernameChecking && usernameAvailable === true && username !== profile?.username && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm">✓ Available</span>
                  )}
                  {!isUsernameChecking && usernameAvailable === false && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-sm">✗ Taken</span>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <Input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full bg-muted cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Language */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {/* Theme Color */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme Color</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                >
                  <option value="pink">Pink</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving || (username !== profile?.username && usernameAvailable === false)}
              className="flex-1 h-11 rounded-lg"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => signOut()}
              className="h-11 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>

            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              className="h-11 rounded-lg"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete Account"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfilePage;
