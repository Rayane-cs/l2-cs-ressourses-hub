import { Resource } from "../types";

const programmingC: Array<Resource> = [
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
    for (int i = 0; i < n; i++) {
        printf("%s\\n", names[i]);
    }
    return 0;
}`,
    explanation: {
      en: `This program uses Bubble Sort to arrange strings alphabetically using strcmp() and strcpy() for swapping.`,
      fr: `Ce programme utilise le tri à bulles pour classer les chaînes par ordre alphabétique avec strcmp() et strcpy().`
    }
  },
  {
    id: "c-intro-3",
    title: "Sort Names Using Selection Sort",
    type: "exercise",
    semester: "S3",
    problem: `Implement Selection Sort to arrange a list of names in descending order (Z → A).
Use strcmp() for comparing and swap the strings accordingly.

Concept:
• Selection sort finds the maximum element and places it in correct position each pass.
• Demonstrates sorting direction control with comparison conditions.
• Reinforces strcmp() mastery.

Example:
Input: { "Diana", "Alice", "Frank", "Bob" }
Output: { "Frank", "Diana", "Bob", "Alice" }`,
    solution: `#include <stdio.h>
#include <string.h>

void selectionSortDesc(char arr[][50], int n) {
    int maxIdx;
    char temp[50];
    for (int i = 0; i < n - 1; i++) {
        maxIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (strcmp(arr[j], arr[maxIdx]) > 0) {
                maxIdx = j;
            }
        }
        strcpy(temp, arr[i]);
        strcpy(arr[i], arr[maxIdx]);
        strcpy(arr[maxIdx], temp);
    }
}

int main() {
    char names[4][50] = {"Diana", "Alice", "Frank", "Bob"};
    int n = 4;
    selectionSortDesc(names, n);

    printf("Sorted names (Z-A):\\n");
    for (int i = 0; i < n; i++) {
        printf("%s\\n", names[i]);
    }
    return 0;
}`,
    explanation: {
      en: `This program uses Selection Sort to arrange strings in descending (Z→A) order using strcmp() for comparison.`,
      fr: `Ce programme utilise le tri par sélection pour classer les chaînes en ordre décroissant (Z→A) en utilisant strcmp().`
    }
  },
  {
    id: "c-intro-4",
    title: "Sort Strings by Length (Insertion Sort)",
    type: "exercise",
    semester: "S3",
    problem: `Create a function that sorts an array of words in ascending order based on their length using Insertion Sort.

Concept:
• Insertion sort inserts each element into its correct place.
• Demonstrates sorting by string length.
• Uses strlen() for comparison.

Example:
Input: { "pear", "apple", "kiwi", "banana" }
Output: { "kiwi", "pear", "apple", "banana" }`,
    solution: `#include <stdio.h>
#include <string.h>

void insertionSortByLength(char arr[][50], int n) {
    char key[50];
    int j;
    for (int i = 1; i < n; i++) {
        strcpy(key, arr[i]);
        j = i - 1;
        while (j >= 0 && strlen(arr[j]) > strlen(key)) {
            strcpy(arr[j + 1], arr[j]);
            j--;
        }
        strcpy(arr[j + 1], key);
    }
}

int main() {
    char words[4][50] = {"pear", "apple", "kiwi", "banana"};
    int n = 4;
    insertionSortByLength(words, n);

    printf("Strings sorted by length:\\n");
    for (int i = 0; i < n; i++) {
        printf("%s\\n", words[i]);
    }
    return 0;
}`,
    explanation: {
      en: `This program sorts words by their length using Insertion Sort and strlen() for comparison.`,
      fr: `Ce programme trie les mots selon leur longueur en utilisant le tri par insertion et strlen() pour la comparaison.`
    }
  },
  {
    id: "c-intro-5",
    title: "Linear Search for a String",
    type: "exercise",
    semester: "S3",
    problem: `Ask the user for a word and check if it exists in a predefined list using Linear Search.
Print the index if found, or "Not found" otherwise.

Concept:
• Linear search checks each element sequentially.
• Works on unsorted data.
• Uses strcmp() for equality check.

Example:
Array: { "apple", "banana", "kiwi", "mango" }
Input: "kiwi"
Output: Value "kiwi" found at index 2`,
    solution: `#include <stdio.h>
#include <string.h>

int linearSearch(char arr[][50], int n, char target[]) {
    for (int i = 0; i < n; i++) {
        if (strcmp(arr[i], target) == 0)
            return i;
    }
    return -1;
}

int main() {
    char fruits[4][50] = {"apple", "banana", "kiwi", "mango"};
    char word[50];
    printf("Enter word to search: ");
    scanf("%s", word);

    int result = linearSearch(fruits, 4, word);
    if (result != -1)
        printf("Value '%s' found at index %d\\n", word, result);
    else
        printf("Not found\\n");
    return 0;
}`,
    explanation: {
      en: `This program searches for a string using Linear Search, checking each element with strcmp().`,
      fr: `Ce programme recherche une chaîne en utilisant la recherche linéaire, en vérifiant chaque élément avec strcmp().`
    }
  },
  {
    id: "c-intro-6",
    title: "Binary Search for a String",
    type: "exercise",
    semester: "S3",
    problem: `Given a sorted list of strings, use Binary Search to locate a specific word.
Print its index if found, otherwise print "Not found".

Concept:
• Binary search splits the range in half each step.
• Requires the array to be sorted.
• Efficient: O(log n) complexity.

Example:
Array: { "apple", "banana", "cherry", "orange", "pear" }
Input: "orange"
Output: Found at index 3`,
    solution: `#include <stdio.h>
#include <string.h>

int binarySearch(char arr[][50], int n, char target[]) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        int cmp = strcmp(arr[mid], target);
        if (cmp == 0)
            return mid;
        else if (cmp < 0)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main() {
    char words[5][50] = {"apple", "banana", "cherry", "orange", "pear"};
    char target[50];
    printf("Enter word to search: ");
    scanf("%s", target);

    int index = binarySearch(words, 5, target);
    if (index != -1)
        printf("Found at index %d\\n", index);
    else
        printf("Not found\\n");
    return 0;
}`,
    explanation: {
      en: `This program performs Binary Search on a sorted list of strings using strcmp() to compare values.`,
      fr: `Ce programme effectue une recherche binaire sur une liste triée de chaînes en utilisant strcmp() pour comparer les valeurs.`
    }
  },
  {
    id: "c-intro-7",
    title: "Sort and Search Combined",
    type: "exercise",
    semester: "S3",
    problem: `Create a program that first sorts an array of names alphabetically using Bubble Sort, then allows the user to search for a name using Binary Search.

Concept:
• Combines sorting (preprocessing) and searching (query).
• Demonstrates modular design and function reuse.

Example:
Input: { "Eve", "Alice", "Bob", "Diana" }
After sorting: { "Alice", "Bob", "Diana", "Eve" }
Search: "Diana" → Found at index 2`,
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

int binarySearch(char arr[][50], int n, char target[]) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        int cmp = strcmp(arr[mid], target);
        if (cmp == 0)
            return mid;
        else if (cmp < 0)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main() {
    char names[4][50] = {"Eve", "Alice", "Bob", "Diana"};
    int n = 4;
    char target[50];

    bubbleSort(names, n);
    printf("Sorted names:\\n");
    for (int i = 0; i < n; i++)
        printf("%s\\n", names[i]);

    printf("Enter name to search: ");
    scanf("%s", target);

    int index = binarySearch(names, n, target);
    if (index != -1)
        printf("Found at index %d\\n", index);
    else
        printf("Not found\\n");
    return 0;
}`,
    explanation: {
      en: `This program first sorts names using Bubble Sort, then searches efficiently using Binary Search.`,
      fr: `Ce programme trie d'abord les noms avec le tri à bulles, puis effectue une recherche efficace à l'aide de la recherche binaire.`
    }
  }
];

export default programmingC;
 