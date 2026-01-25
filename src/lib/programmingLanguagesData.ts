import d from "react-syntax-highlighter/dist/esm/languages/hljs/d";

export interface CourseResource {
  title: string;
  url: string;
  type: 'youtube' | 'website';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
}

export interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
}

export interface PracticeExercise {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  hints?: string[];
  solution?: string;
}

export interface LanguageData {
  name: string;
  slug: string;
  description: string;
  icon: string; // Now stores SVG string
  color: string;
  category: 'Web' | 'Backend' | 'System' | 'Database';
  isAvailable?: boolean;
  courses: CourseResource[];
  tests: {
    5: TestQuestion[];
    10: TestQuestion[];
  };
  exercises: PracticeExercise[];
}

export const programmingLanguagesData: Record<string, LanguageData> = {
  html: {
    name: 'HTML',
    slug: 'html',
    description: 'HyperText Markup Language - The foundation of web pages',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path><path fill="#FFF" d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"></path><path fill="#EEE" d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"></path>
</svg>`,
    color: '#E34F26',
    category: 'Web',
    isAvailable: true,
    courses: [
      {
        title: 'HTML Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
        type: 'youtube',
        difficulty: 'beginner',
        description: 'Complete HTML tutorial for beginners'
      },
      {
        title: 'HTML Crash Course - Traversy Media',
        url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'HTML Crash Course - Traversy Media',
        url: 'https://www.youtube.com/watch?v=Dv39fDYei9A&list=PLknwEmKsW8OvX7kZhsv6I6tT8SKDXDwUc',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'MDN Web Docs - HTML',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        type: 'website',
        difficulty: 'intermediate',
        description: 'Comprehensive HTML documentation'
      },
      {
        title: 'freeCodeCamp - Responsive Web Design',
        url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
        type: 'website',
        difficulty: 'beginner'
      },
      {
        title: 'W3Schools HTML Tutorial',
        url: 'https://www.w3schools.com/html/',
        type: 'website',
        difficulty: 'beginner'
      }
    ],
    tests: {
      5: [
        {
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
          correctAnswer: 0,
          explanation: 'HTML stands for HyperText Markup Language, the standard markup language for creating web pages.'
        },
        {
          question: 'Which HTML tag is used to define the largest heading?',
          options: ['<heading>', '<h6>', '<h1>', '<head>'],
          correctAnswer: 2,
          explanation: '<h1> defines the largest heading, while <h6> defines the smallest.'
        },
        {
          question: 'What is the correct HTML element for inserting a line break?',
          options: ['<break>', '<lb>', '<br>', '<newline>'],
          correctAnswer: 2
        },
        {
          question: 'Which attribute is used to provide alternative text for an image?',
          options: ['title', 'alt', 'src', 'longdesc'],
          correctAnswer: 1
        },
        {
          question: 'What is the correct HTML for creating a hyperlink?',
          options: ['<a url="http://example.com">Link</a>', '<a href="http://example.com">Link</a>', '<link>http://example.com</link>', '<a>http://example.com</a>'],
          correctAnswer: 1
        },
        {
          question: 'Which HTML tag is used to define an unordered list?',
          options: ['<ol>', '<list>', '<ul>', '<li>'],
          correctAnswer: 2
        },
        {
          question: 'What is the correct HTML for making a text input field?',
          options: ['<input type="text">', '<textfield>', '<textinput>', '<input type="textfield">'],
          correctAnswer: 0
        },
        {
          question: 'Which HTML element defines the title of a document?',
          options: ['<meta>', '<title>', '<head>', '<header>'],
          correctAnswer: 1
        },
        {
          question: 'What is the correct HTML for making a checkbox?',
          options: ['<input type="check">', '<checkbox>', '<input type="checkbox">', '<check>'],
          correctAnswer: 2
        },
        {
          question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
          options: ['title', 'alt', 'src', 'longdesc'],
          correctAnswer: 1
        }
      ],
      10: [
        {
          question: 'Which HTML element is most appropriate for wrapping the main content of a page?',
          options: ['<section>', '<main>', '<article>', '<body>'],
          correctAnswer: 1
        },
        {
          question: 'Which attribute improves accessibility by explicitly linking a label to a form input?',
          options: ['name', 'id', 'for', 'aria-label'],
          correctAnswer: 2
        },
        {
          question: 'Which HTML element should be used for self-contained, reusable content like a blog post?',
          options: ['<section>', '<article>', '<div>', '<aside>'],
          correctAnswer: 1
        },
        {
          question: 'What does the "defer" attribute do when used with a <script> tag?',
          options: [
            'Loads the script after the page is fully rendered',
            'Executes the script immediately',
            'Blocks HTML parsing until the script loads',
            'Runs the script only on user interaction'
          ],
          correctAnswer: 0
        },
        {
          question: 'Which HTML attribute is required for an <img> element to be accessible?',
          options: ['src', 'title', 'alt', 'loading'],
          correctAnswer: 2
        },
        {
          question: 'Which element is best suited for marking up navigation links?',
          options: ['<menu>', '<links>', '<nav>', '<ul>'],
          correctAnswer: 2
        },
        {
          question: 'What is the purpose of the <meta charset="UTF-8"> tag?',
          options: [
            'Defines page language',
            'Sets character encoding',
            'Improves SEO ranking',
            'Links external stylesheets'
          ],
          correctAnswer: 1
        },
        {
          question: 'Which input type is specifically designed for email validation?',
          options: ['text', 'mail', 'email', 'validate'],
          correctAnswer: 2
        },
        {
          question: 'Which HTML element is used to group related form controls?',
          options: ['<form>', '<fieldset>', '<section>', '<group>'],
          correctAnswer: 1
        },
        {
          question: 'What does the <figure> element represent?',
          options: [
            'Decorative images only',
            'Images without captions',
            'Self-contained media with optional captions',
            'Only charts and graphs'
          ],
          correctAnswer: 2
        },
        {
          question: 'Which attribute allows a video to play automatically without sound?',
          options: ['autoplay', 'loop', 'muted', 'controls'],
          correctAnswer: 2
        },
        {
          question: 'Which HTML element is used to provide a caption for a <figure>?',
          options: ['<caption>', '<legend>', '<figcaption>', '<summary>'],
          correctAnswer: 2
        },
        {
          question: 'What is the main purpose of semantic HTML?',
          options: [
            'Improve visual styling',
            'Reduce file size',
            'Make content meaningful to browsers and assistive tech',
            'Replace CSS'
          ],
          correctAnswer: 2
        },
        {
          question: 'Which attribute specifies that an input value must match a regular expression?',
          options: ['validate', 'pattern', 'required', 'regex'],
          correctAnswer: 1
        },
        {
          question: 'Which HTML element is used to mark up time or dates in a machine-readable way?',
          options: ['<date>', '<time>', '<meta>', '<span>'],
          correctAnswer: 1
        },
        {
          question: 'Which attribute is used to lazy-load images in modern HTML?',
          options: ['async', 'defer', 'lazy', 'loading'],
          correctAnswer: 3
        },
        {
          question: 'Which element represents content that is tangentially related to the main content?',
          options: ['<aside>', '<footer>', '<section>', '<nav>'],
          correctAnswer: 0
        },
        {
          question: 'What happens if multiple <h1> elements are used correctly in HTML5?',
          options: [
            'The page becomes invalid',
            'SEO is broken',
            'It is allowed within sectioning elements',
            'Browsers ignore them'
          ],
          correctAnswer: 2
        },
        {
          question: 'Which HTML attribute is used to define keyboard navigation order?',
          options: ['accesskey', 'tabindex', 'key', 'focus'],
          correctAnswer: 1
        },
        {
          question: 'Which element is used to define expandable content controlled by the user?',
          options: ['<expand>', '<details>', '<summary>', '<accordion>'],
          correctAnswer: 1
        }
      ]
    },
    exercises: [
      //Easy
      {
        title: 'Create a Simple List',
        difficulty: 'easy',
        description: 'Create an unordered list with three list items.',
        hints: ['Use <ul> element', 'Use <li> for each item'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <ul>\n    <li>Item One</li>\n    <li>Item Two</li>\n    <li>Item Three</li>\n  </ul>\n</body>\n</html>'
      },
      {
        title: 'Add a Hyperlink',
        difficulty: 'easy',
        description: 'Create a link that opens an external website.',
        hints: ['Use <a> tag', 'Use href attribute'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <a href="https://example.com">Visit Example</a>\n</body>\n</html>'
      },
      {
        title: 'Display an Image with Caption',
        difficulty: 'easy',
        description: 'Display an image with a short text description below it.',
        hints: ['Use <img> tag', 'Use <p> for caption'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <img src="image.jpg" alt="Sample image">\n  <p>This is an image caption.</p>\n</body>\n</html>'
      },
      //Medium
      {
        title: 'Create a Login Form',
        difficulty: 'medium',
        description: 'Build a login form with username and password fields.',
        hints: ['Use <form>', 'Use input type="text" and type="password"', 'Add a submit button'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <form>\n    <input type="text" placeholder="Username">\n    <input type="password" placeholder="Password">\n    <button type="submit">Login</button>\n  </form>\n</body>\n</html>'
      },
      {
        title: 'Build a Table',
        difficulty: 'medium',
        description: 'Create a table with 2 rows and 2 columns.',
        hints: ['Use <table>', '<tr> for rows', '<td> for cells'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <table border="1">\n    <tr><td>A</td><td>B</td></tr>\n    <tr><td>C</td><td>D</td></tr>\n  </table>\n</body>\n</html>'
      },
      {
        title: 'Create Internal Page Sections',
        difficulty: 'medium',
        description: 'Create sections and link to them using internal anchors.',
        hints: ['Use id attributes', 'Use <a href="#id">'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <a href="#about">Go to About</a>\n  <h2 id="about">About Section</h2>\n  <p>About content here.</p>\n</body>\n</html>'
      },
      {
        title: 'Add Required Form Fields',
        difficulty: 'medium',
        description: 'Create a form where inputs must be filled before submission.',
        hints: ['Use required attribute'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <form>\n    <input type="email" required>\n    <button type="submit">Submit</button>\n  </form>\n</body>\n</html>'
      },
      {
        title: 'Embed a Video',
        difficulty: 'medium',
        description: 'Embed a video with playback controls.',
        hints: ['Use <video> tag', 'Use controls attribute'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <video controls width="300">\n    <source src="video.mp4" type="video/mp4">\n  </video>\n</body>\n</html>'
      },
      //Hard
      {
        title: 'Create a Semantic Page Layout',
        difficulty: 'hard',
        description: 'Build a page using semantic HTML elements for layout.',
        hints: ['Use <header>, <nav>, <main>, <footer>'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <header>Header</header>\n  <nav>Navigation</nav>\n  <main>Main Content</main>\n  <footer>Footer</footer>\n</body>\n</html>'
      },
      {
        title: 'Accessible Contact Form',
        difficulty: 'hard',
        description: 'Create a contact form with proper labels for accessibility.',
        hints: ['Use <label>', 'Use for and id attributes'],
        solution: '<!DOCTYPE html>\n<html>\n<body>\n  <form>\n    <label for="email">Email:</label>\n    <input id="email" type="email">\n    <button type="submit">Send</button>\n  </form>\n</body>\n</html>'
      }
    ]
  },
  
  css: {
    name: 'CSS',
    slug: 'css',
    description: 'Cascading Style Sheets - Style and design for web pages',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#039BE5" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path><path fill="#FFF" d="M33.1 13L24 13 24 17 28.9 17 28.6 21 24 21 24 25 28.4 25 28.1 29.5 24 30.9 24 35.1 31.9 32.5 32.6 21 32.6 21z"></path><path fill="#EEE" d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z"></path>
</svg>`,
    color: '#1572B6',
    category: 'Web',
    isAvailable: false,
    courses: [
      {
        title: 'CSS Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'CSS Crash Course - Traversy Media',
        url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'MDN Web Docs - CSS',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        type: 'website',
        difficulty: 'intermediate'
      },
      {
        title: 'CSS-Tricks',
        url: 'https://css-tricks.com/',
        type: 'website',
        difficulty: 'intermediate'
      },
      {
        title: 'freeCodeCamp - Responsive Web Design',
        url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
        type: 'website',
        difficulty: 'beginner'
      }
    ],
    tests: {
      5: [
        {
          question: 'What does CSS stand for?',
          options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
          correctAnswer: 1
        },
        {
          question: 'Which HTML attribute is used to define inline styles?',
          options: ['class', 'style', 'styles', 'font'],
          correctAnswer: 1
        },
        {
          question: 'Which property is used to change the background color?',
          options: ['color', 'bgcolor', 'background-color', 'bg-color'],
          correctAnswer: 2
        },
        {
          question: 'How do you add a comment in CSS?',
          options: ['// comment', '<!-- comment -->', '/* comment */', '# comment'],
          correctAnswer: 2
        },
        {
          question: 'Which property is used to change the text color?',
          options: ['text-color', 'font-color', 'color', 'text-style'],
          correctAnswer: 2
        },
        {
          question: 'How do you select an element with id "demo"?',
          options: ['.demo', '#demo', '*demo', 'demo'],
          correctAnswer: 1
        },
        {
          question: 'How do you select elements with class "test"?',
          options: ['.test', '#test', '*test', 'test'],
          correctAnswer: 0
        },
        {
          question: 'Which property is used to change the font?',
          options: ['font-family', 'font-style', 'font-weight', 'text-font'],
          correctAnswer: 0
        },
        {
          question: 'How do you make text bold?',
          options: ['font-weight: bold', 'text-style: bold', 'font: bold', 'text-weight: bold'],
          correctAnswer: 0
        },
        {
          question: 'Which property is used to change the left margin?',
          options: ['margin-left', 'padding-left', 'indent', 'left-margin'],
          correctAnswer: 0
        }
      ],
      10: [
        {
          question: 'What does CSS stand for?',
          options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
          correctAnswer: 1
        },
        {
          question: 'Which HTML attribute is used to define inline styles?',
          options: ['class', 'style', 'styles', 'font'],
          correctAnswer: 1
        },
        {
          question: 'Which property is used to change the background color?',
          options: ['color', 'bgcolor', 'background-color', 'bg-color'],
          correctAnswer: 2
        },
        {
          question: 'How do you add a comment in CSS?',
          options: ['// comment', '<!-- comment -->', '/* comment */', '# comment'],
          correctAnswer: 2
        },
        {
          question: 'Which property is used to change the text color?',
          options: ['text-color', 'font-color', 'color', 'text-style'],
          correctAnswer: 2
        },
        {
          question: 'How do you select an element with id "demo"?',
          options: ['.demo', '#demo', '*demo', 'demo'],
          correctAnswer: 1
        },
        {
          question: 'How do you select elements with class "test"?',
          options: ['.test', '#test', '*test', 'test'],
          correctAnswer: 0
        },
        {
          question: 'Which property is used to change the font?',
          options: ['font-family', 'font-style', 'font-weight', 'text-font'],
          correctAnswer: 0
        },
        {
          question: 'How do you make text bold?',
          options: ['font-weight: bold', 'text-style: bold', 'font: bold', 'text-weight: bold'],
          correctAnswer: 0
        },
        {
          question: 'Which property is used to change the left margin?',
          options: ['margin-left', 'padding-left', 'indent', 'left-margin'],
          correctAnswer: 0
        },
        {
          question: 'What is the default value of the position property?',
          options: ['relative', 'fixed', 'absolute', 'static'],
          correctAnswer: 3
        },
        {
          question: 'Which property is used to create space between the element border and content?',
          options: ['margin', 'padding', 'spacing', 'border-spacing'],
          correctAnswer: 1
        },
        {
          question: 'How do you make a list not display bullet points?',
          options: ['list-style-type: none', 'list: none', 'bullet: none', 'list-style: no-bullet'],
          correctAnswer: 0
        },
        {
          question: 'Which CSS property controls the text size?',
          options: ['text-size', 'font-size', 'text-style', 'font-style'],
          correctAnswer: 1
        },
        {
          question: 'How do you display hyperlinks without an underline?',
          options: ['text-decoration: none', 'text-decoration: no-underline', 'decoration: none', 'underline: none'],
          correctAnswer: 0
        },
        {
          question: 'Which property is used to align text?',
          options: ['text-align', 'align', 'text-alignment', 'alignment'],
          correctAnswer: 0
        },
        {
          question: 'What is the correct CSS syntax for making all <p> elements bold?',
          options: ['p {text-size: bold}', 'p {font-weight: bold}', '<p style="font-weight: bold">', 'p {text-weight: bold}'],
          correctAnswer: 1
        },
        {
          question: 'How do you add a background color for all <h1> elements?',
          options: ['h1 {background-color: #FFFFFF}', 'h1.all {background-color: #FFFFFF}', 'all.h1 {background-color: #FFFFFF}', 'h1 {bgcolor: #FFFFFF}'],
          correctAnswer: 0
        },
        {
          question: 'Which CSS property is used to change the text case?',
          options: ['text-transform', 'text-case', 'case', 'transform'],
          correctAnswer: 0
        },
        {
          question: 'What is the correct CSS syntax to make all <div> elements have a border?',
          options: ['div {border: 1px solid black}', 'div {border-width: 1px}', 'div.all {border: 1px}', 'all.div {border: 1px}'],
          correctAnswer: 0
        }
      ]
    },
    exercises: [
      {
        title: 'Style a Button',
        difficulty: 'easy',
        description: 'Create CSS to style a button with background color, padding, and hover effect.',
        hints: ['Use background-color', 'Use padding', 'Use :hover pseudo-class']
      },
      {
        title: 'Create a Flexbox Layout',
        difficulty: 'medium',
        description: 'Use Flexbox to create a responsive navigation bar.',
        hints: ['Use display: flex', 'Use justify-content and align-items', 'Consider flex-direction for mobile']
      },
      {
        title: 'Build a Card Component',
        difficulty: 'medium',
        description: 'Create a card with image, title, description, and button using CSS.',
        hints: ['Use border-radius for rounded corners', 'Use box-shadow for depth', 'Consider hover effects']
      }
    ]
  },
  
  java: {
    name: 'Java',
    slug: 'java',
    description: 'Object-oriented programming language for enterprise applications',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#F44336" d="M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z"></path><path fill="#F44336" d="M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z"></path><g><path fill="#1565C0" d="M32.084 25.055c1.754-.394 3.233.723 3.233 2.01 0 2.901-4.021 5.643-4.021 5.643s6.225-.742 6.225-5.505C37.521 24.053 34.464 23.266 32.084 25.055zM29.129 27.395c0 0 1.941-1.383 2.458-1.902-4.763 1.011-15.638 1.147-15.638.269 0-.809 3.507-1.638 3.507-1.638s-7.773-.112-7.773 2.181C11.683 28.695 21.858 28.866 29.129 27.395z"></path><path fill="#1565C0" d="M27.935,29.571c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z"></path><path fill="#1565C0" d="M18.686,32.739c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z"></path><path fill="#1565C0" d="M36.281,36.632c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z"></path><path fill="#1565C0" d="M39,38.604c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z"></path></g>
</svg>`,
    color: '#007396',
    category: 'Backend',
    isAvailable: false,
    courses: [
      {
        title: 'Java Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=grEKMHGYyns',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'Java Tutorial for Beginners - Programming with Mosh',
        url: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'Oracle Java Documentation',
        url: 'https://docs.oracle.com/en/java/',
        type: 'website',
        difficulty: 'intermediate'
      },
      {
        title: 'freeCodeCamp - Java',
        url: 'https://www.freecodecamp.org/news/tag/java/',
        type: 'website',
        difficulty: 'beginner'
      }
    ],
    tests: {
      5: [
        {
          question: 'What is Java?',
          options: ['A scripting language', 'An object-oriented programming language', 'A markup language', 'A database'],
          correctAnswer: 1
        },
        {
          question: 'Which keyword is used to create a class in Java?',
          options: ['class', 'Class', 'new', 'object'],
          correctAnswer: 0
        },
        {
          question: 'What is the extension of Java source files?',
          options: ['.java', '.class', '.jar', '.jav'],
          correctAnswer: 0
        },
        {
          question: 'Which method is the entry point of a Java program?',
          options: ['start()', 'main()', 'run()', 'execute()'],
          correctAnswer: 1
        },
        {
          question: 'What does JVM stand for?',
          options: ['Java Virtual Machine', 'Java Variable Method', 'Java Visual Machine', 'Java Version Manager'],
          correctAnswer: 0
        },
        {
          question: 'Which keyword is used for inheritance in Java?',
          options: ['inherits', 'extends', 'implements', 'super'],
          correctAnswer: 1
        },
        {
          question: 'What is the default value of a boolean variable?',
          options: ['true', 'false', 'null', '0'],
          correctAnswer: 1
        },
        {
          question: 'Which access modifier makes a member accessible only within its own class?',
          options: ['public', 'protected', 'private', 'default'],
          correctAnswer: 2
        },
        {
          question: 'What is the size of int in Java?',
          options: ['8 bits', '16 bits', '32 bits', '64 bits'],
          correctAnswer: 2
        },
        {
          question: 'Which keyword is used to prevent method overriding?',
          options: ['static', 'final', 'abstract', 'const'],
          correctAnswer: 1
        }
      ],
      10: Array(20).fill(null).map((_, i) => ({
        question: `Java Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      }))
    },
    exercises: [
      {
        title: 'Hello World Program',
        difficulty: 'easy',
        description: 'Write a Java program that prints "Hello, World!" to the console.'
      },
      {
        title: 'Calculator Class',
        difficulty: 'medium',
        description: 'Create a Calculator class with methods for basic arithmetic operations.'
      }
    ]
  },

  mysql: {
    name: 'MySQL',
    slug: 'mysql',
    description: 'Popular relational database management system',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<circle cx="24" cy="24" r="20" fill="#216287"></circle><circle cx="24" cy="24" r="18" fill="#e87912"></circle><path fill="#216287" d="M29.69,31.95c0,4.35-3.09,7.98-7.19,8.82l-0.55,0.1C13.53,39.87,7,32.7,7,24c0-9.39,7.61-17,17-17 c0.17,0,0.35,0,0.52,0.01c-3.5,1.23-6.02,4.56-6.02,8.49c0,1.49,0.36,2.9,1.01,4.14c0.86,1.66,2.3,2.94,3.97,3.78l1.22,0.61 c1.67,0.84,3.12,2.12,3.98,3.78C29.32,29.05,29.69,30.46,29.69,31.95z"></path><path fill="#fff" d="M24,6C14.059,6,6,14.059,6,24c0,8.671,6.132,15.906,14.295,17.614l0.012,0.063l0.159-0.029 C21.609,41.876,22.79,42,24,42c9.941,0,18-8.059,18-18C42,14.059,33.941,6,24,6z M8,24c0-7.935,5.813-14.521,13.4-15.769 C19.309,9.994,18,12.626,18,15.5c0,1.519,0.367,3.029,1.062,4.368c0.865,1.668,2.316,3.051,4.197,3.996l1.219,0.613 c1.691,0.852,2.991,2.084,3.759,3.564c0.63,1.214,0.949,2.528,0.949,3.907c0,3.645-2.35,6.857-5.711,8.024 C14.897,39.693,8,32.645,8,24z M25.905,39.876c2.599-1.721,4.281-4.668,4.281-7.927c0-1.52-0.367-3.029-1.062-4.368 c-0.865-1.668-2.316-3.051-4.197-3.996l-1.219-0.613c-1.692-0.852-2.991-2.083-3.759-3.564C19.319,18.193,19,16.879,19,15.5 c0-3.173,1.781-6.017,4.464-7.473C23.643,8.021,23.819,8,24,8c8.822,0,16,7.178,16,16C40,32.177,33.831,38.93,25.905,39.876z"></path><path fill="#fff" d="M38.458,27.528c-0.776-0.927-2.018-1.829-2.809-3.135c-0.111-0.184-0.053-0.407,0.135-0.507 C36.799,23.342,36.978,23.441,38,23c-1-1-2.037-1.36-3.681-1.774c-0.322-0.067-0.507-0.337-0.561-0.634 c-0.088-0.323-0.275-0.87-0.471-1.307c-1.421-2.871-3.192-6.625-6.786-6.907c-0.237-0.003-0.463-0.099-0.62-0.257 c-0.453-0.432-1.087-0.967-1.67-1.055c-0.115,0.011-0.057-0.028-0.146,0.054c-0.233,0.273-0.186,0.283-0.026,0.63 c0.216,0.369,0.628,0.791,1.033,1.208c0.411,0.531,0.126,1.308,0.396,1.904c0.111,0.423,0.344,0.923,0.603,1.229 c0.125,0.161,0.163,0.365,0.124,0.55c-0.288,1.377-0.491,2.862-0.212,4.241c0.006,0.147,0.15,0.202,0.256,0.149 c0.033-0.026,0.032-0.008,0.16-0.233C26.556,20.448,27.675,18.307,28,19c0.473,1.538,1.13,4.53,2.522,5.455 c0.059,0.025,0.013,0.122-0.045,0.089c-1.454-0.751-2.631-2.682-2.978-3.984c-0.27,0.023-0.512,0.242-0.648,0.493 c-0.205,0.719-1.26,0.756-1.449-0.013c-0.076-0.298-0.138-0.6-0.167-0.905c-0.111-1.11-0.041-2.753,0.211-3.582 c-0.704-0.76-1.098-2.227-1.005-2.995c-0.413-0.418-0.847-0.829-1.17-1.344c-0.608-0.774-0.076-2.132,0.967-2.083 c0.924,0.077,1.672,0.707,2.33,1.301c0.729-0.065,2.173,0.444,2.982,0.991c1.834,1.191,2.799,3.236,3.847,5.078 c0.409,0.836,1.142,2.25,1.123,2.924c1.866,0.578,3.975,1.277,5.039,3.046c0.019,0.035,0.001,0.08-0.038,0.091 c0,0-2.9,0.91-2.9,0.91l1.921,3C38.575,27.522,38.495,27.584,38.458,27.528L38.458,27.528z"></path><path fill="#fff" d="M27.046,13.688l0.833,1.189C27.879,14.878,28.83,13.53,27.046,13.688z"></path><g><path fill="#fff" d="M9.762,20.071c0.776,0.927,2.018,1.829,2.809,3.135c0.111,0.184,0.053,0.407-0.135,0.507 c-1.015,0.543-1.193,0.444-2.215,0.886c1,1,2.037,1.36,3.681,1.774c0.322,0.067,0.507,0.337,0.561,0.634 c0.088,0.323,0.275,0.87,0.471,1.307c1.421,2.871,3.192,6.625,6.786,6.907c0.237,0.003,0.463,0.099,0.62,0.257 c0.453,0.432,1.087,0.967,1.67,1.055c0.115-0.011,0.057,0.028,0.146-0.054c0.233-0.273,0.186-0.283,0.026-0.63 c-0.216-0.369-0.628-0.791-1.033-1.208c-0.411-0.531-0.126-1.308-0.396-1.904c-0.111-0.423-0.344-0.923-0.603-1.229 c-0.125-0.161-0.163-0.365-0.124-0.55c0.288-1.377,0.491-2.862,0.212-4.241c-0.006-0.147-0.15-0.202-0.256-0.149 c-0.033,0.026-0.032,0.008-0.16,0.233c-0.158,0.348-1.277,2.49-1.602,1.796c-0.473-1.538-1.13-4.53-2.522-5.455 c-0.059-0.025-0.013-0.122,0.045-0.089c1.454,0.751,2.631,2.682,2.978,3.984c0.27-0.023,0.512-0.242,0.648-0.493 c0.205-0.719,1.26-0.756,1.449,0.013c0.076,0.298,0.138,0.6,0.167,0.905c0.111,1.11,0.041,2.753-0.211,3.582 c0.704,0.76,1.098,2.227,1.005,2.995c0.413,0.418,0.847,0.829,1.17,1.344c0.608,0.774,0.076,2.132-0.967,2.083 c-0.924-0.077-1.672-0.707-2.33-1.301c-0.729,0.065-2.173-0.444-2.982-0.991c-1.834-1.191-2.799-3.236-3.847-5.078 c-0.409-0.836-1.142-2.25-1.123-2.924c-1.866-0.578-3.975-1.277-5.039-3.046c-0.019-0.035-0.001-0.08,0.038-0.091 c0,0,2.9-0.91,2.9-0.91l-1.921-3C9.645,20.077,9.725,20.016,9.762,20.071L9.762,20.071z"></path><path fill="#fff" d="M21.174,33.911l-0.833-1.189C20.342,32.722,19.39,34.07,21.174,33.911z"></path></g>
</svg>`,
    color: '#4479A1',
    category: 'Database',
    isAvailable: false,
    courses: [
      {
        title: 'MySQL Tutorial for Beginners - Programming with Mosh',
        url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'MySQL Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'MySQL Documentation',
        url: 'https://dev.mysql.com/doc/',
        type: 'website',
        difficulty: 'intermediate'
      }
    ],
    tests: {
      5: Array(10).fill(null).map((_, i) => ({
        question: `MySQL Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      })),
      10: Array(20).fill(null).map((_, i) => ({
        question: `MySQL Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      }))
    },
    exercises: [
      {
        title: 'Create a Database',
        difficulty: 'easy',
        description: 'Write SQL to create a database and a table for storing user information.'
      }
    ]
  },

  c: {
    name: 'C',
    slug: 'c',
    description: 'Powerful general-purpose programming language',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#283593" fill-rule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clip-rule="evenodd"></path><path fill="#5c6bc0" fill-rule="evenodd" d="M5.304,34.404C5.038,34.048,5,33.71,5,33.255 c0-3.744,0-15.014,0-18.759c0-0.758,0.417-1.458,1.094-1.836c3.343-1.872,13.405-7.507,16.748-9.38 c0.677-0.379,1.594-0.371,2.271,0.008c3.343,1.872,13.371,7.459,16.714,9.331c0.27,0.152,0.476,0.335,0.66,0.576L5.304,34.404z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M24,10c7.727,0,14,6.273,14,14s-6.273,14-14,14 s-14-6.273-14-14S16.273,10,24,10z M24,17c3.863,0,7,3.136,7,7c0,3.863-3.137,7-7,7s-7-3.137-7-7C17,20.136,20.136,17,24,17z" clip-rule="evenodd"></path><path fill="#3949ab" fill-rule="evenodd" d="M42.485,13.205c0.516,0.483,0.506,1.211,0.506,1.784 c0,3.795-0.032,14.589,0.009,18.384c0.004,0.396-0.127,0.813-0.323,1.127L23.593,24L42.485,13.205z" clip-rule="evenodd"></path>
</svg>`,
    color: '#A8B9CC',
    category: 'System',
    isAvailable: false,
    courses: [
      {
        title: 'C Programming Tutorial - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'C Programming Full Course - Bro Code',
        url: 'https://www.youtube.com/watch?v=87SH2Cn0s9A',
        type: 'youtube',
        difficulty: 'beginner'
      }
    ],
    tests: {
      5: Array(10).fill(null).map((_, i) => ({
        question: `C Programming Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      })),
      10: Array(20).fill(null).map((_, i) => ({
        question: `C Programming Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      }))
    },
    exercises: [
      {
        title: 'Hello World in C',
        difficulty: 'easy',
        description: 'Write a C program that prints "Hello, World!" to the console.'
      }
    ]
  },

  python: {
    name: 'Python',
    slug: 'python',
    description: 'High-level programming language for versatile applications',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
</svg>`,
    color: '#3776AB',
    category: 'Backend',
    isAvailable: false,
    courses: [
      {
        title: 'Python for Beginners - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'Python Tutorial - Programming with Mosh',
        url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
        type: 'youtube',
        difficulty: 'beginner'
      },
      {
        title: 'Python.org Documentation',
        url: 'https://docs.python.org/3/',
        type: 'website',
        difficulty: 'intermediate'
      }
    ],
    tests: {
      5: Array(10).fill(null).map((_, i) => ({
        question: `Python Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      })),
      10: Array(20).fill(null).map((_, i) => ({
        question: `Python Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      }))
    },
    exercises: [
      {
        title: 'Python Hello World',
        difficulty: 'easy',
        description: 'Write a Python program that prints "Hello, World!"'
      }
    ]
  },

  assembly: {
    name: 'Assembly',
    slug: 'assembly',
    description: 'Low-level programming language for direct hardware control',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#455A64" d="M40,39H8V9h32V39z"></path><path fill="#90A4AE" d="M37,36H11V12h26V36z"></path><path fill="#37474F" d="M16,17h16v14H16V17z"></path><path fill="#78909C" d="M19,20h10v8H19V20z"></path><rect width="6" height="2" x="4" y="14" fill="#546E7A"></rect><rect width="6" height="2" x="4" y="20" fill="#546E7A"></rect><rect width="6" height="2" x="4" y="26" fill="#546E7A"></rect><rect width="6" height="2" x="4" y="32" fill="#546E7A"></rect><rect width="6" height="2" x="38" y="14" fill="#546E7A"></rect><rect width="6" height="2" x="38" y="20" fill="#546E7A"></rect><rect width="6" height="2" x="38" y="26" fill="#546E7A"></rect><rect width="6" height="2" x="38" y="32" fill="#546E7A"></rect><rect width="2" height="6" x="14" y="4" fill="#546E7A"></rect><rect width="2" height="6" x="20" y="4" fill="#546E7A"></rect><rect width="2" height="6" x="26" y="4" fill="#546E7A"></rect><rect width="2" height="6" x="32" y="4" fill="#546E7A"></rect><rect width="2" height="6" x="14" y="38" fill="#546E7A"></rect><rect width="2" height="6" x="20" y="38" fill="#546E7A"></rect><rect width="2" height="6" x="26" y="38" fill="#546E7A"></rect><rect width="2" height="6" x="32" y="38" fill="#546E7A"></rect>
</svg>`,
    color: '#6E4C13',
    category: 'System',
    isAvailable: false,
    courses: [
      {
        title: 'Assembly Language Programming - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=gfmRrPjnEw4',
        type: 'youtube',
        difficulty: 'advanced'
      },
      {
        title: 'x86 Assembly Crash Course',
        url: 'https://www.youtube.com/watch?v=75gBFiFtAb8',
        type: 'youtube',
        difficulty: 'intermediate'
      }
    ],
    tests: {
      5: Array(10).fill(null).map((_, i) => ({
        question: `Assembly Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      })),
      10: Array(20).fill(null).map((_, i) => ({
        question: `Assembly Question ${i + 1}`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      }))
    },
    exercises: [
      {
        title: 'Basic Assembly Program',
        difficulty: 'hard',
        description: 'Write an assembly program that adds two numbers.'
      }
    ]
  }
};

export const getAllLanguages = () => Object.values(programmingLanguagesData);

export const getLanguageBySlug = (slug: string) => programmingLanguagesData[slug];
