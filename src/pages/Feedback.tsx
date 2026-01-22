import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heart, Star, FileText, Link as LinkIcon, Palette, Lightbulb, User } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const feedbackSchema = z.object({
  name: z.string().min(2, "Please enter your name (at least 2 characters)").max(100, "Name must be less than 100 characters"),
  usefulness: z.enum(["excellent", "very-good", "good", "fair", "poor"], {
    required_error: "Please rate how useful you find this website",
  }),
  filePreference: z.enum(["pdfs", "drive-links", "both", "no-preference"], {
    required_error: "Please select your file preference",
  }),
  themeLiked: z.enum(["yes", "no"], {
    required_error: "Please indicate if you like the color theme",
  }),
  themeSuggestions: z.string().optional(),
  futureFeatures: z.string().max(500, "Feedback must be less than 500 characters").optional().or(z.literal("")),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const Feedback = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isGuest } = useAuth();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      usefulness: undefined,
      filePreference: undefined,
      themeLiked: undefined,
      themeSuggestions: "",
      futureFeatures: "",
    },
  });

  useEffect(() => {
    // Check if user has already submitted feedback
    const submitted = localStorage.getItem("feedbackSubmitted");
    if (submitted === "true") {
      setHasSubmitted(true);
    }
    
    // Auto-fill email if user is logged in
    if (user?.email) {
      form.setValue("name", user.email);
    }
  }, [user, form]);

  // Watch themeLiked to conditionally require themeSuggestions
  const themeLiked = form.watch("themeLiked");

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Format the email content
      const emailContent = `
New Feedback Submission from UHBC Resource Hub

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 SUBMITTED BY
${data.name || "Anonymous"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 USEFULNESS RATING
${data.usefulness === "excellent" ? "⭐ Excellent - So much useful" :
  data.usefulness === "very-good" ? "⭐ Very Good - Very useful" :
  data.usefulness === "good" ? "⭐ Good - Useful" :
  data.usefulness === "fair" ? "⭐ Fair - Somewhat useful" :
  "⭐ Poor - Not very useful"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 FILE PREFERENCE
${data.filePreference === "pdfs" ? "📄 Include files as PDFs" :
  data.filePreference === "drive-links" ? "🔗 Keep Drive links (current approach)" :
  data.filePreference === "both" ? "📄🔗 Both PDFs and Drive links" :
  "⚪ No preference"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 COLOR THEME
Do they like it? ${data.themeLiked === "yes" ? "✅ Yes" : "❌ No"}
${data.themeSuggestions ? `\nSuggestions:\n${data.themeSuggestions}` : "No suggestions provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 FUTURE FEATURES REQUESTED
${data.futureFeatures}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted at: ${new Date().toLocaleString()}
      `;

      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      // Prepare template parameters (needed for both test mode and EmailJS)
      const templateParams = {
        to_email: "kessoularayaneayoub@gmail.com",
        subject: "New Feedback from UHBC Resource Hub",
        message: emailContent,
        name: data.name || "Anonymous",
        usefulness: data.usefulness === "excellent" ? "Excellent - So much useful" :
          data.usefulness === "very-good" ? "Very Good - Very useful" :
          data.usefulness === "good" ? "Good - Useful" :
          data.usefulness === "fair" ? "Fair - Somewhat useful" :
          "Poor - Not very useful",
        file_preference: data.filePreference === "pdfs" ? "Include files as PDFs" :
          data.filePreference === "drive-links" ? "Keep Drive links (current approach)" :
          data.filePreference === "both" ? "Both PDFs and Drive links" :
          "No preference",
        theme_liked: data.themeLiked === "yes" ? "Yes" : "No",
        theme_suggestions: data.themeSuggestions || "No suggestions provided",
        future_features: data.futureFeatures,
      };

      // Check if EmailJS credentials are configured
      const isEmailJSConfigured = serviceId !== "YOUR_SERVICE_ID" && 
                                   templateId !== "YOUR_TEMPLATE_ID" && 
                                   publicKey !== "YOUR_PUBLIC_KEY";
      
      if (!isEmailJSConfigured) {
        toast.warning("Test mode: Feedback saved locally. Configure EmailJS for email delivery.");
        localStorage.setItem("feedbackSubmitted", "true");
        localStorage.setItem("feedbackData", JSON.stringify(data));
        await new Promise(resolve => setTimeout(resolve, 1500));
        setHasSubmitted(true);
        setIsSubmitting(false);
        return;
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      
      // Save to localStorage to prevent showing again
      localStorage.setItem("feedbackSubmitted", "true");
      localStorage.setItem("feedbackData", JSON.stringify(data));
      
      toast.success("Thank you! Your feedback has been submitted successfully.");
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasSubmitted(true);
    } catch (error: unknown) {
      console.error("Error submitting feedback:", error);
      
      // Provide more detailed error messages
      let errorMessage = "Failed to submit feedback. Please try again later.";
      let errorDetails = "";
      
      // Handle EmailJS specific errors
      if (error && typeof error === 'object') {
        if ('status' in error) {
          errorDetails = `Status: ${error.status}`;
          console.error("EmailJS status:", error.status);
        }
        if ('text' in error) {
          errorDetails += ` - ${String(error.text)}`;
          console.error("EmailJS error text:", error.text);
        }
      }
      
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        errorDetails = error.message;
        
        if (error.message.includes("Invalid") || error.message.includes("template") || error.message.includes("service")) {
          errorMessage = "Invalid EmailJS configuration. Please check your Service ID, Template ID, and Public Key.";
        } else if (error.message.includes("network") || error.message.includes("fetch") || error.message.includes("Failed to fetch")) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error.message.includes("400") || error.message.includes("401") || error.message.includes("403")) {
          errorMessage = "EmailJS authentication error. Please check your Public Key and template settings.";
        }
      }
      
      // Show detailed error in console for debugging
      console.error("Full error object:", error);
      console.error("Error details:", errorDetails);
      
      toast.error(errorMessage);
      
      // Don't save to localStorage if email failed (optional - remove if you want to save anyway)
      // The form will remain available for retry
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already submitted, show thank you message
  if (hasSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-10 flex items-center justify-center">
          <Card className="max-w-md mx-auto animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{t.feedback.thankYou}</CardTitle>
              <CardDescription className="mt-2">
                {t.feedback.thankYouDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => navigate("/")} variant="default">
                {t.feedback.goToHome}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-3xl text-center">{t.feedback.title}</CardTitle>
              <CardDescription className="text-center">
                {t.feedback.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          {t.feedback.yourName}
                        </FormLabel>
                        <FormDescription>
                          {user ? "Your account email is pre-filled" : t.feedback.yourNameDesc}
                        </FormDescription>
                        <FormControl>
                          <Input
                            placeholder={t.feedback.enterName}
                            {...field}
                            readOnly={!!user}
                            className={user ? "bg-muted/50 cursor-not-allowed" : ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 1: Usefulness Rating */}
                  <FormField
                    control={form.control}
                    name="usefulness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          {t.feedback.usefulness}
                        </FormLabel>
                        <FormDescription>
                          {t.feedback.usefulnessDesc}
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3 mt-4"
                          >
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="excellent" id="excellent" />
                              <Label htmlFor="excellent" className="cursor-pointer font-normal flex-1">
                                <span className="font-semibold">{t.feedback.excellent.split(" - ")[0]}</span> - {t.feedback.excellent.split(" - ")[1]}
                              </Label>
                              <div className="flex gap-1">
                                {[1,2,3,4,5].map((i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="very-good" id="very-good" />
                              <Label htmlFor="very-good" className="cursor-pointer font-normal flex-1">
                                <span className="font-semibold">{t.feedback.veryGood.split(" - ")[0]}</span> - {t.feedback.veryGood.split(" - ")[1]}
                              </Label>
                              <div className="flex gap-1">
                                {[1,2,3,4].map((i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="good" id="good" />
                              <Label htmlFor="good" className="cursor-pointer font-normal flex-1">
                                <span className="font-semibold">{t.feedback.good.split(" - ")[0]}</span> - {t.feedback.good.split(" - ")[1]}
                              </Label>
                              <div className="flex gap-1">
                                {[1,2,3].map((i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="fair" id="fair" />
                              <Label htmlFor="fair" className="cursor-pointer font-normal flex-1">
                                <span className="font-semibold">{t.feedback.fair.split(" - ")[0]}</span> - {t.feedback.fair.split(" - ")[1]}
                              </Label>
                              <div className="flex gap-1">
                                {[1,2].map((i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="poor" id="poor" />
                              <Label htmlFor="poor" className="cursor-pointer font-normal flex-1">
                                <span className="font-semibold">{t.feedback.poor.split(" - ")[0]}</span> - {t.feedback.poor.split(" - ")[1]}
                              </Label>
                              <div className="flex gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 2: File Preference */}
                  <FormField
                    control={form.control}
                    name="filePreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          {t.feedback.filePreference}
                        </FormLabel>
                        <FormDescription>
                          {t.feedback.filePreferenceDesc}
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3 mt-4"
                          >
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="pdfs" id="pdfs" />
                              <Label htmlFor="pdfs" className="cursor-pointer font-normal flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                {t.feedback.includePdfs}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="drive-links" id="drive-links" />
                              <Label htmlFor="drive-links" className="cursor-pointer font-normal flex items-center gap-2">
                                <LinkIcon className="h-4 w-4" />
                                {t.feedback.keepDriveLinks}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="both" id="both" />
                              <Label htmlFor="both" className="cursor-pointer font-normal flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <LinkIcon className="h-4 w-4" />
                                {t.feedback.bothPdfsAndLinks}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                              <RadioGroupItem value="no-preference" id="no-preference" />
                              <Label htmlFor="no-preference" className="cursor-pointer font-normal">
                                {t.feedback.noPreference}
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 3: Color Theme */}
                  <FormField
                    control={form.control}
                    name="themeLiked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base flex items-center gap-2">
                          <Palette className="h-5 w-5 text-primary" />
                          {t.feedback.themeLiked}
                        </FormLabel>
                        <FormDescription>
                          {t.feedback.themeLikedDesc}
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-row gap-6 mt-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="theme-yes" />
                              <Label htmlFor="theme-yes" className="cursor-pointer font-normal">
                                {t.feedback.yes}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="theme-no" />
                              <Label htmlFor="theme-no" className="cursor-pointer font-normal">
                                {t.feedback.no}
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Theme Suggestions (conditional) */}
                  <FormField
                    control={form.control}
                    name="themeSuggestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base flex items-center gap-2">
                          <Palette className="h-5 w-5 text-primary" />
                          {t.feedback.themeSuggestions}
                        </FormLabel>
                        <FormDescription>
                          {themeLiked === "no" 
                            ? t.feedback.themeSuggestionsDesc
                            : t.feedback.themeSuggestionsDesc}
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder={t.feedback.themeSuggestionsPlaceholder}
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Question 4: Future Features */}
                  <FormField
                    control={form.control}
                    name="futureFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-primary" />
                          {t.feedback.futureFeatures}
                        </FormLabel>
                        <FormDescription>
                          {t.feedback.futureFeaturesDesc}
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder={t.feedback.futureFeaturesPlaceholder}
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-right">
                          {field.value?.length || 0}/500 {t.feedback.characters}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="flex-1"
                    >
                      {t.feedback.skip}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? t.feedback.submitting : t.feedback.submitFeedback}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;

