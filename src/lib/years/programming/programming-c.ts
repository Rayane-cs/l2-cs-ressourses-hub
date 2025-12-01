import { Resource } from "../../types";

const programmingC: Array<Resource> = [
  // ===== Sorting & Searching =====
  {
    id: "c-intro-2",
    title: "Sort Names Using Bubble Sort",
    type: "exercise",
    semester: "S3",
    problem: `Write a function that sorts an array of names (strings) in alphabetical order using the Bubble Sort algorithm.
The comparison should use strcmp() and swapping should use a temporary string variable.

Concept:
• Bubble sort repeatedly compares adjacent elements and swaps them if out of order.
• Uses nested loops.
• Demonstrates string comparison and swapping logic.

Example:
Input: { "pear", "apple", "kiwi", "banana" }
Output: { "apple", "banana", "kiwi", "pear" }`,
    solution: `#include <stdio.h>
#include <string.h>

void bubbleSort(char arr[][50], int n) {
    char temp[50];
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (strcmp(arr[j], arr[j + 1]) > 0) {
                strcpy(temp, arr[j]);
                strcpy(arr[j], arr[j + 1]);
                strcpy(arr[j + 1], temp);
            }
        }
    }
}

int main() {
    char names[4][50] = {"pear", "apple", "kiwi", "banana"};
    int n = 4;
    bubbleSort(names, n);
    printf("Sorted names (A-Z):\\n");
    for (int i = 0; i < n; i++)
        printf("%s\\n", names[i]);
    return 0;
}`,
    explanation: {
      en: `This program sorts strings alphabetically using Bubble Sort and strcmp(). It swaps adjacent strings until the array is sorted.`,
      fr: `Ce programme trie des chaînes par ordre alphabétique en utilisant le tri à bulles et strcmp(). Il échange les chaînes voisines jusqu'à ce que le tableau soit trié.`
    }
  },
  {
    id: "c-sort-selection",
    title: "Sort Names Using Selection Sort",
    type: "exercise",
    semester: "S3",
    problem: `Implement Selection Sort to arrange a list of names in descending order (Z → A).
Use strcmp() for comparing and swap the strings accordingly.

Concept:
• Selection sort finds the maximum element and places it at the correct position each pass.
• Demonstrates control of sorting direction using comparison conditions.
• Reinforces mastery of strcmp() usage.

Example:
Input names: { "Diana", "Alice", "Frank", "Bob" }
Output (descending): { "Frank", "Diana", "Bob", "Alice" }`,
    solution: `#include <stdio.h>
#include <string.h>

void selectionSortDesc(char arr[][50], int n) {
    char temp[50];
    for (int i = 0; i < n - 1; i++) {
        int maxIdx = i;
        for (int j = i + 1; j < n; j++)
            if (strcmp(arr[j], arr[maxIdx]) > 0)
                maxIdx = j;
        if (maxIdx != i) {
            strcpy(temp, arr[i]);
            strcpy(arr[i], arr[maxIdx]);
            strcpy(arr[maxIdx], temp);
        }
    }
}

int main() {
    char names[4][50] = {"Diana", "Alice", "Frank", "Bob"};
    int n = 4;
    selectionSortDesc(names, n);
    printf("Sorted (Z-A):\\n");
    for (int i = 0; i < n; i++)
        printf("%s\\n", names[i]);
    return 0;
}`,
    explanation: {
      en: `This program sorts strings in descending order using Selection Sort. It repeatedly finds the maximum string and swaps it into position.`,
      fr: `Ce programme trie des chaînes de caractères en ordre décroissant avec le tri par sélection. Il trouve la chaîne maximale et la place à la bonne position.`
    }
  },
  {
    id: "c-sort-length",
    title: "Sort Strings by Length (Insertion Sort)",
    type: "exercise",
    semester: "S3",
    problem: `Create a function that sorts an array of words in ascending order based on their length using Insertion Sort.

Concept:
• Insertion sort inserts each element into its proper place in the sorted part of the array.
• Demonstrates sorting using custom criteria (string length).
• Uses strlen() for comparison.

Example:
Input: { "pear", "apple", "kiwi", "banana" }
Output: { "kiwi", "pear", "apple", "banana" }`,
    solution: `#include <stdio.h>
#include <string.h>

void insertionSortByLength(char arr[][50], int n) {
    char key[50];
    for (int i = 1; i < n; i++) {
        strcpy(key, arr[i]);
        int j = i - 1;
        while (j >= 0 && strlen(arr[j]) > strlen(key)) {
            strcpy(arr[j + 1], arr[j]);
            j--;
        }
        strcpy(arr[j + 1], key);
    }
}

int main() {
    char words[4][50] = {"pear", "apple", "kiwi", "banana"};
    insertionSortByLength(words, 4);
    printf("Sorted by length:\\n");
    for (int i = 0; i < 4; i++)
        printf("%s\\n", words[i]);
    return 0;
}`,
    explanation: {
      en: `This insertion sort orders words by increasing length using strlen().`,
      fr: `Ce tri par insertion classe les mots par longueur croissante à l'aide de strlen().`
    }
  },
  {
    id: "c-search-linear",
    title: "Linear Search for a String",
    type: "exercise",
    semester: "S3",
    problem: `Ask the user for a word and check if it exists in a predefined list of strings using Linear Search.
Print the index if found or "Not found" otherwise.`,
    solution: `#include <stdio.h>
#include <string.h>

int main() {
    char list[4][20] = {"apple", "banana", "kiwi", "mango"};
    char word[20];
    printf("Enter a word: ");
    scanf("%s", word);
    int found = -1;
    for (int i = 0; i < 4; i++) {
        if (strcmp(list[i], word) == 0) {
            found = i;
            break;
        }
    }
    if (found != -1)
        printf("Value '%s' found at index %d\\n", word, found);
    else
        printf("Not found\\n");
    return 0;
}`,
    explanation: {
      en: `This program searches each element in an array of strings until a match is found.`,
      fr: `Ce programme recherche chaque élément d'un tableau de chaînes jusqu'à trouver une correspondance.`
    }
  },
  {
    id: "c-search-binary",
    title: "Binary Search for a String",
    type: "exercise",
    semester: "S3",
    problem: `Given a sorted list of strings, use Binary Search to locate a specific word.
Print its index if found, otherwise print "Not found".`,
    solution: `#include <stdio.h>
#include <string.h>

int binarySearch(char arr[][20], int n, char target[]) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        int cmp = strcmp(arr[mid], target);
        if (cmp == 0) return mid;
        else if (cmp < 0) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    char words[5][20] = {"apple", "banana", "cherry", "orange", "pear"};
    char search[20];
    printf("Enter a word: ");
    scanf("%s", search);
    int idx = binarySearch(words, 5, search);
    if (idx != -1)
        printf("Value '%s' found at index %d\\n", search, idx);
    else
        printf("Not found\\n");
    return 0;
}`,
    explanation: {
      en: `Binary search divides the array in half each step, offering efficient search on sorted data.`,
      fr: `La recherche binaire divise le tableau en deux à chaque étape, ce qui la rend efficace sur des données triées.`
    }
  },
  {
    id: "c-sort-search-combined",
    title: "Sort and Search Combined",
    type: "exercise",
    semester: "S3",
    problem: `Create a program that first sorts an array of names alphabetically using Bubble Sort, then allows the user to search for a name using Binary Search.`,
    solution: `#include <stdio.h>
#include <string.h>

void bubbleSort(char arr[][50], int n) {
    char temp[50];
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (strcmp(arr[j], arr[j + 1]) > 0) {
                strcpy(temp, arr[j]);
                strcpy(arr[j], arr[j + 1]);
                strcpy(arr[j + 1], temp);
            }
}

int binarySearch(char arr[][50], int n, char target[]) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        int cmp = strcmp(arr[mid], target);
        if (cmp == 0) return mid;
        else if (cmp < 0) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    char names[4][50] = {"Eve", "Alice", "Bob", "Diana"};
    int n = 4;
    bubbleSort(names, n);
    printf("Sorted list:\\n");
    for (int i = 0; i < n; i++)
        printf("%s\\n", names[i]);
    char target[50];
    printf("Enter a name to search: ");
    scanf("%s", target);
    int index = binarySearch(names, n, target);
    if (index != -1)
        printf("'%s' found at index %d\\n", target, index);
    else
        printf("Not found\\n");
    return 0;
}`,
    explanation: {
      en: `This exercise combines Bubble Sort and Binary Search to demonstrate sorting followed by efficient searching.`,
      fr: `Cet exercice combine le tri à bulles et la recherche binaire pour démontrer le tri suivi d'une recherche efficace.`
    }
  },

  // ===== Simple Functions =====
  {
    id: "c-func-max",
    title: "Find Maximum of Two Numbers",
    type: "exercise",
    semester: "S3",
    problem: `Write a function that takes two integers and returns the greater of the two.`,
    solution: `#include <stdio.h>
int maxOfTwo(int a, int b) {
    return (a > b) ? a : b;
}
int main() {
    int x, y;
    printf("Enter two numbers: ");
    scanf("%d %d", &x, &y);
    printf("Max = %d\\n", maxOfTwo(x, y));
    return 0;
}`,
    explanation: {
      en: `A simple function returning the maximum of two integers.`,
      fr: `Une fonction simple qui renvoie le maximum de deux entiers.`
    }
  },
  {
    id: "c-func-min-array",
    title: "Find Minimum in an Array",
    type: "exercise",
    semester: "S3",
    problem: `Write a function that finds the smallest element in an integer array.`,
    solution: `#include <stdio.h>
int findMin(int arr[], int n) {
    int min = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] < min) min = arr[i];
    return min;
}
int main() {
    int arr[5] = {5, 3, 9, 1, 4};
    printf("Min = %d\\n", findMin(arr, 5));
    return 0;
}`,
    explanation: {
      en: `This function traverses the array to find the smallest value.`,
      fr: `Cette fonction parcourt le tableau pour trouver la plus petite valeur.`
    }
  },
  {
    id: "c-func-average",
    title: "Compute Average of an Array",
    type: "exercise",
    semester: "S3",
    problem: `Write a function that calculates the average of all elements in an integer array.`,
    solution: `#include <stdio.h>
float average(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) sum += arr[i];
    return (float)sum / n;
}
int main() {
    int arr[3] = {10, 20, 30};
    printf("Average = %.2f\\n", average(arr, 3));
    return 0;
}`,
    explanation: {
      en: `Calculates the mean value of integers using summation and division.`,
      fr: `Calcule la moyenne d'un tableau d'entiers à l'aide de la somme et de la division.`
    }
  },

  // ===== Algorithm Puzzles =====
  {
    id: "c-puzzle-reverse-num",
    title: "Reverse a Number",
    type: "exercise",
    semester: "S3",
    problem: `Write a program that reverses the digits of an integer.`,
    solution: `#include <stdio.h>
int main() {
    int n, reversed = 0;
    printf("Enter a number: ");
    scanf("%d", &n);
    while (n != 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    printf("Reversed number: %d\\n", reversed);
    return 0;
}`,
    explanation: {
      en: `Uses modulus and division to reverse integer digits.`,
      fr: `Utilise le modulo et la division pour inverser les chiffres d'un entier.`
    }
  },
  {
    id: "c-puzzle-vowel-count",
    title: "Count Vowels in a String",
    type: "exercise",
    semester: "S3",
    problem: `Ask the user to enter a word and count how many vowels it contains.`,
    solution: `#include <stdio.h>
#include <string.h>
int main() {
    char str[100];
    int count = 0;
    printf("Enter a word: ");
    scanf("%s", str);
    for (int i = 0; i < strlen(str); i++) {
        char c = str[i];
        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u'||
            c=='A'||c=='E'||c=='I'||c=='O'||c=='U')
            count++;
    }
    printf("Number of vowels: %d\\n", count);
    return 0;
}`,
    explanation: {
      en: `Traverses a string and counts vowels using simple conditions.`,
      fr: `Parcourt une chaîne et compte les voyelles à l'aide de conditions simples.`
    }
  },
  {
    id: "c-puzzle-palindrome",
    title: "Palindrome Check",
    type: "exercise",
    semester: "S3",
    problem: `Write a program that checks if a string is a palindrome.`,
    solution: `#include <stdio.h>
#include <string.h>
int main() {
    char str[100];
    int isPal = 1;
    printf("Enter a word: ");
    scanf("%s", str);
    int n = strlen(str);
    for (int i = 0; i < n / 2; i++)
        if (str[i] != str[n - i - 1]) {
            isPal = 0;
            break;
        }
    if (isPal)
        printf("Palindrome\\n");
    else
        printf("Not a palindrome\\n");
    return 0;
}`,
    explanation: {
      en: `Checks if a word reads the same forward and backward.`,
      fr: `Vérifie si un mot se lit de la même façon dans les deux sens.`
    }
  }
];

export default programmingC;
