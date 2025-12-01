import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageInfo {
  name: string;
  description: string;
  features: string[];
  history: string;
  useCases: string[];
  syntax: string;
}

const languageData: Record<string, LanguageInfo> = {
  c: {
    name: "C",
    description: "C is a powerful, general-purpose programming language created in 1972 by Dennis Ritchie. It provides a good balance between high-level constructs and low-level memory access, making it ideal for system programming and embedded systems.",
    features: [
      "Simple and efficient syntax",
      "Direct memory management with pointers",
      "Fast compilation and execution",
      "Minimal runtime overhead",
      "Portable across different platforms",
      "Procedural programming paradigm",
    ],
    history: "C was developed at Bell Labs and became one of the most influential programming languages. It served as the foundation for many modern languages like C++, C#, and Java. The language is standardized (ISO/IEC 9899) and continues to be widely used today.",
    useCases: [
      "Operating Systems (Unix, Linux kernels)",
      "Embedded Systems and Microcontrollers",
      "System Software and Compilers",
      "Database Management Systems",
      "Game Development",
      "Performance-critical applications",
    ],
    syntax: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
  python: {
    name: "Python",
    description: "Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python emphasizes code clarity and allows programmers to express concepts in fewer lines of code than other languages.",
    features: [
      "Simple and readable syntax",
      "Interpreted language (no compilation needed)",
      "Dynamic typing",
      "Extensive standard library",
      "Object-oriented and functional programming support",
      "Cross-platform compatibility",
      "Large ecosystem of third-party libraries",
    ],
    history: "Named after Monty Python, Python was designed to be fun to use. It gained immense popularity due to its ease of learning and versatility. Python 3, released in 2008, brought significant improvements and is now the standard version.",
    useCases: [
      "Data Science and Machine Learning",
      "Web Development",
      "Artificial Intelligence",
      "Scientific Computing",
      "Automation and Scripting",
      "Game Development",
      "Desktop Applications",
    ],
    syntax: `def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`,
  },
  java: {
    name: "Java",
    description: "Java is a general-purpose, object-oriented programming language created by Sun Microsystems in 1995. It follows the 'write once, run anywhere' (WORA) philosophy, running on the Java Virtual Machine (JVM) across different platforms.",
    features: [
      "Object-oriented programming",
      "Platform independent (JVM-based)",
      "Strong type checking",
      "Automatic memory management (garbage collection)",
      "Robust and secure",
      "Multithreading support",
      "Rich API and libraries",
    ],
    history: "Java was created by James Gosling and colleagues at Sun Microsystems. It revolutionized programming by introducing the JVM concept, which allows the same code to run on any platform. Oracle acquired Sun in 2010 and continues to develop Java.",
    useCases: [
      "Enterprise Applications",
      "Web Applications (Spring, Jakarta EE)",
      "Android Mobile Development",
      "Big Data Processing (Hadoop, Spark)",
      "Cloud Applications",
      "Desktop Applications",
      "Microservices Architecture",
    ],
    syntax: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  assembly: {
    name: "Assembly",
    description: "Assembly language is a low-level programming language that provides symbolic representations of machine code instructions. It differs by CPU architecture and is used when direct hardware control and maximum performance are required.",
    features: [
      "Direct hardware access",
      "Minimal runtime overhead",
      "Maximum performance optimization",
      "CPU-specific instructions",
      "Symbolic notation for machine code",
      "Full memory control",
      "Smallest code footprint",
    ],
    history: "Assembly emerged in the early days of computing as a readable alternative to pure machine code (binary). Each CPU architecture has its own assembly language. Famous examples include x86, ARM, and MIPS. Assembly is still vital for system-level programming.",
    useCases: [
      "Bootloaders and Firmware",
      "Kernel Development",
      "Performance-critical code sections",
      "Device Drivers",
      "Embedded Systems",
      "Real-time systems",
      "Computer architecture education",
    ],
    syntax: `; x86-64 Assembly (Linux)
section .text
    global _start

_start:
    mov rax, 1          ; write syscall
    mov rdi, 1          ; stdout
    mov rsi, msg        ; buffer
    mov rdx, len        ; length
    syscall

    mov rax, 60         ; exit syscall
    xor rdi, rdi        ; exit code 0
    syscall`,
  },
};

export default function ProgrammingLanguage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const language = lang && languageData[lang.toLowerCase()];

  if (!language) {
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Language Not Found</h1>
            <p className="text-muted-foreground mb-6">The programming language you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/home")}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {language.name}
            </h1>
            <p className="text-xl text-muted-foreground">{language.description}</p>
          </div>

          {/* Features */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {language.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">History</h2>
            <p className="text-foreground leading-relaxed">{language.history}</p>
          </div>

          {/* Use Cases */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
            <ul className="space-y-2">
              {language.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-center gap-3 text-foreground">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                    {idx + 1}
                  </span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>

          {/* Example Code */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Hello World Example</h2>
            <pre className="bg-background/50 rounded p-4 overflow-x-auto">
              <code className="text-sm font-mono text-foreground">{language.syntax}</code>
            </pre>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Learn {language.name}?</h2>
            <p className="text-muted-foreground mb-6">
              Check out the resources in our library to start your journey with {language.name}.
            </p>
            <Button size="lg" onClick={() => navigate(`/programming?lang=${lang?.toLowerCase()}`)}>
              Explore Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
