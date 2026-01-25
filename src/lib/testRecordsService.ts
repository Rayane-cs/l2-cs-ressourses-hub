import { supabase } from './supabaseClient';

export interface TestRecord {
  id?: string;
  user_id?: string;
  display_id?: string | null;
  email?: string | null;
  language: string;
  test_duration: number;
  score: number;
  total_questions: number;
  percentage?: number;
  completed_at?: string;
  created_at?: string;
}

export interface TestResult {
  language: string;
  testDuration: number;
  score: number;
  totalQuestions: number;
}

/**
 * Save a test result to the database
 */
export async function saveTestRecord(
  result: TestResult,
  userId: string,
  displayId: string | null,
  email: string | null
): Promise<{ success: boolean; error?: any; data?: TestRecord }> {
  try {
    const percentage = (result.score / result.totalQuestions) * 100;

    const record: Partial<TestRecord> = {
      user_id: userId,
      display_id: displayId,
      email: email,
      language: result.language,
      test_duration: result.testDuration,
      score: result.score,
      total_questions: result.totalQuestions,
      percentage: parseFloat(percentage.toFixed(2)),
    };

    const { data, error } = await supabase
      .from('language_test_records')
      .insert([record])
      .select()
      .single();

    if (error) {
      console.error('Error saving test record:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error saving test record:', error);
    return { success: false, error };
  }
}

/**
 * Get all test records for a specific user
 */
export async function getUserTestRecords(
  userId: string
): Promise<{ success: boolean; data?: TestRecord[]; error?: any }> {
  try {
    const { data, error } = await supabase
      .from('language_test_records')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching user test records:', error);
      return { success: false, error };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching user test records:', error);
    return { success: false, error };
  }
}

/**
 * Get best record for a specific language and duration
 */
export async function getBestRecord(
  userId: string,
  language: string,
  testDuration: number
): Promise<{ success: boolean; data?: TestRecord; error?: any }> {
  try {
    const { data, error } = await supabase
      .from('language_test_records')
      .select('*')
      .eq('user_id', userId)
      .eq('language', language)
      .eq('test_duration', testDuration)
      .order('score', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // No records found is not an error
      if (error.code === 'PGRST116') {
        return { success: true, data: undefined };
      }
      console.error('Error fetching best record:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching best record:', error);
    return { success: false, error };
  }
}

/**
 * Get all best records for a user (one per language/duration combination)
 */
export async function getAllBestRecords(
  userId: string
): Promise<{ success: boolean; data?: TestRecord[]; error?: any }> {
  try {
    // Get all records and process client-side to find best per language/duration
    const { data, error } = await supabase
      .from('language_test_records')
      .select('*')
      .eq('user_id', userId)
      .order('score', { ascending: false });

    if (error) {
      console.error('Error fetching all best records:', error);
      return { success: false, error };
    }

    // Group by language and duration, keep only the best
    const bestRecords = new Map<string, TestRecord>();
    
    data?.forEach((record) => {
      const key = `${record.language}-${record.test_duration}`;
      if (!bestRecords.has(key) || (bestRecords.get(key)?.score || 0) < record.score) {
        bestRecords.set(key, record);
      }
    });

    return { success: true, data: Array.from(bestRecords.values()) };
  } catch (error) {
    console.error('Unexpected error fetching all best records:', error);
    return { success: false, error };
  }
}

/**
 * Get statistics for a specific language
 */
export async function getLanguageStats(
  userId: string,
  language: string
): Promise<{
  success: boolean;
  data?: {
    totalTests: number;
    averageScore: number;
    bestScore: number;
    bestPercentage: number;
  };
  error?: any;
}> {
  try {
    const { data, error } = await supabase
      .from('language_test_records')
      .select('score, total_questions, percentage')
      .eq('user_id', userId)
      .eq('language', language);

    if (error) {
      console.error('Error fetching language stats:', error);
      return { success: false, error };
    }

    if (!data || data.length === 0) {
      return {
        success: true,
        data: {
          totalTests: 0,
          averageScore: 0,
          bestScore: 0,
          bestPercentage: 0,
        },
      };
    }

    const totalTests = data.length;
    const scores = data.map((r) => r.score);
    const percentages = data.map((r) => r.percentage || 0);
    
    const averageScore = scores.reduce((a, b) => a + b, 0) / totalTests;
    const bestScore = Math.max(...scores);
    const bestPercentage = Math.max(...percentages);

    return {
      success: true,
      data: {
        totalTests,
        averageScore: parseFloat(averageScore.toFixed(2)),
        bestScore,
        bestPercentage,
      },
    };
  } catch (error) {
    console.error('Unexpected error fetching language stats:', error);
    return { success: false, error };
  }
}
