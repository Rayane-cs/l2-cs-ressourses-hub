import { Resource } from "../../types";

const programmingpy: Array<Resource> = [
  {
    id: "python-intro-1",
    title: "Calculate Factorial Using Recursion",
    type: "exercise",
    semester: "S3",

    problem: `Write a recursive function to calculate the factorial of a given number.<br><br>

Concept:<br>
• Recursion is a programming technique where a function calls itself.<br>
• Factorial of n (n!) = n × (n-1) × (n-2) × ... × 1<br>
• Base case: 0! = 1<br><br>

Example:<br>
<pre>Input: 5<br>
Output: 120</pre>`,

    solution: `def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

# Test the function
num = 5
result = factorial(num)
print(f"The factorial of {num} is {result}")`,

    explanation: {
      en: `This function uses recursion to calculate factorial. It calls itself with decreasing values until it reaches the base case (n=0), then multiplies the results back up the call stack.`,

      fr: `Cette fonction utilise la récursion pour calculer la factorielle. Elle s'appelle elle-même avec des valeurs décroissantes jusqu'à atteindre le cas de base (n=0), puis multiplie les résultats en remontant la pile d'appels.`
    }
  }
];

export default programmingpy;
