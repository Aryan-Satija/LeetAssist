const cpp = [
    {
      "question": "Why does the following code give a segmentation fault?",
      "code": [
        "int* arr = new int[5];",
        "for (int i = 0; i <= 5; ++i) {",
        "    arr[i] = i;",
        "}",
        "delete[] arr;"
      ],
      "options": [
        "a) delete[] arr is incorrect syntax.",
        "b) The loop accesses memory out of bounds.",
        "c) The pointer is null.",
        "d) The new keyword is incorrect."
      ],
      "answer": "b) The loop accesses memory out of bounds."
    },
    {
      "question": "What issue do you see in this code, and how would you fix it?",
      "code": [
        "int* ptr = new int(10);",
        "delete ptr;",
        "*ptr = 20;"
      ],
      "options": [
        "a) You should use ptr = nullptr; after deleting the pointer.",
        "b) Memory leak due to unused new.",
        "c) No issues, the code is fine.",
        "d) Use free(ptr) instead of delete ptr."
      ],
      "answer": "a) You should use ptr = nullptr; after deleting the pointer."
    },
    {
      "question": "Identify the memory leak in this code and fix it.",
      "code": [
        "void createArray() {",
        "    int* arr = new int[100];",
        "    // Missing cleanup",
        "}"
      ],
      "options": [
        "a) The array should be delete[]-ed.",
        "b) new cannot be used inside a function.",
        "c) Use free(arr) instead of delete[] arr.",
        "d) There's no memory leak."
      ],
      "answer": "a) The array should be delete[]-ed."
    },
    {
      "question": "What is the output of this code?",
      "code": [
        "int x;",
        "std::cout << x << std::endl;"
      ],
      "options": [
        "a) The program prints 0.",
        "b) The program crashes.",
        "c) Undefined behavior; the value of x is garbage.",
        "d) Compiler error due to uninitialized variable."
      ],
      "answer": "c) Undefined behavior; the value of x is garbage."
    },
    {
      "question": "Why does this loop not terminate?",
      "code": [
        "int i = 0;",
        "while (i != 10) {",
        "    i += 2;",
        "}"
      ],
      "options": [
        "a) i will never equal 10.",
        "b) i is reset to 0 inside the loop.",
        "c) The loop condition is invalid.",
        "d) Infinite loops are normal in C++."
      ],
      "answer": "a) i will never equal 10."
    },
    {
      "question": "Why doesn't this code correctly sort the array?",
      "code": [
        "std::vector<int> arr = {5, 3, 8, 1};",
        "std::sort(arr.begin(), arr.end(), [](int a, int b) { return a > b; });",
        "for (int num : arr) {",
        "    std::cout << num << \" \";",
        "}"
      ],
      "options": [
        "a) The lambda comparator should be return a < b.",
        "b) std::sort cannot sort std::vector.",
        "c) The code correctly sorts in descending order.",
        "d) There's a syntax error in the lambda function."
      ],
      "answer": "c) The code correctly sorts in descending order."
    },
    {
      "question": "What's wrong with this code?",
      "code": [
        "std::vector<int> vec = {1, 2, 3};",
        "for (int i = 0; i <= vec.size(); ++i) {",
        "    std::cout << vec[i] << std::endl;",
        "}"
      ],
      "options": [
        "a) vec[i] is invalid for i == vec.size().",
        "b) The loop should use < vec.size() instead of <=.",
        "c) Both a and b.",
        "d) No issues with this code."
      ],
      "answer": "c) Both a and b."
    },
    {
      "question": "What is the issue with the following code?",
      "code": [
        "int num = 5;",
        "if (num = 10) {",
        "    std::cout << \"Number is 10\";",
        "}"
      ],
      "options": [
        "a) The condition assigns 10 to num instead of comparing.",
        "b) num should not be modified in an if statement.",
        "c) Replace = with ==.",
        "d) Both a and c."
      ],
      "answer": "d) Both a and c."
    },
    {
      "question": "Identify the problem with this multithreaded code.",
      "code": [
        "int counter = 0;",
        "void incrementCounter() {",
        "    for (int i = 0; i < 1000; ++i) {",
        "        counter++;",
        "    }",
        "}",
        "int main() {",
        "    std::thread t1(incrementCounter);",
        "    std::thread t2(incrementCounter);",
        "    t1.join();",
        "    t2.join();",
        "    std::cout << counter << std::endl;",
        "}"
      ],
      "options": [
        "a) Data race on counter due to no synchronization.",
        "b) counter must be declared volatile.",
        "c) Use std::atomic<int> or a mutex for thread safety.",
        "d) Both a and c."
      ],
      "answer": "d) Both a and c."
    },
    {
      "question": "What causes undefined behavior in this code?",
      "code": [
        "int x = 10;",
        "int y = x++ + ++x;",
        "std::cout << y << std::endl;"
      ],
      "options": [
        "a) Multiple modifications to x without a sequence point.",
        "b) Use of ++ on the same variable twice in one statement.",
        "c) Both a and b.",
        "d) No undefined behavior here."
      ],
      "answer": "c) Both a and b."
    }
];

const py = [
    {
      "question": "Why does this code raise a ZeroDivisionError?",
      "code": [
        "def divide(a, b):",
        "    return a / b",
        "",
        "result = divide(10, 0)",
        "print(result)"
      ],
      "options": [
        "a) b cannot be 0 because division by zero is not allowed.",
        "b) The function divide is not defined correctly.",
        "c) The print statement is incorrect.",
        "d) There is no error in the code."
      ],
      "answer": "a) b cannot be 0 because division by zero is not allowed."
    },
    {
      "question": "Why does this code give a TypeError?",
      "code": [
        "def add(a, b):",
        "    return a + b",
        "",
        "result = add(5, '10')",
        "print(result)"
      ],
      "options": [
        "a) You cannot add an integer and a string directly.",
        "b) The function add is not defined correctly.",
        "c) The print statement is causing the error.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) You cannot add an integer and a string directly."
    },
    {
      "question": "Why does this code cause a NameError?",
      "code": [
        "def greet():",
        "    print(message)",
        "",
        "greet()"
      ],
      "options": [
        "a) The variable 'message' is not defined.",
        "b) The function greet() must have an argument.",
        "c) The print statement is incorrect.",
        "d) Functions cannot access variables outside their scope."
      ],
      "answer": "a) The variable 'message' is not defined."
    },
    {
      "question": "Why does this code throw an AttributeError?",
      "code": [
        "my_list = [1, 2, 3]",
        "my_list.append(4)",
        "my_list.add(5)"
      ],
      "options": [
        "a) The method 'add()' does not exist for lists.",
        "b) The list is immutable.",
        "c) The 'append()' method is incorrect.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) The method 'add()' does not exist for lists."
    },
    {
      "question": "Why does this code cause an IndexError?",
      "code": [
        "my_list = [1, 2, 3]",
        "print(my_list[3])"
      ],
      "options": [
        "a) Index 3 is out of range for the list.",
        "b) The list is empty.",
        "c) The print statement is incorrect.",
        "d) Lists in Python start at index 1."
      ],
      "answer": "a) Index 3 is out of range for the list."
    },
    {
      "question": "Why does this code fail with a KeyError?",
      "code": [
        "my_dict = {'a': 1, 'b': 2}",
        "print(my_dict['c'])"
      ],
      "options": [
        "a) The key 'c' does not exist in the dictionary.",
        "b) The dictionary is empty.",
        "c) The print statement is incorrect.",
        "d) Dictionaries cannot have keys of type string."
      ],
      "answer": "a) The key 'c' does not exist in the dictionary."
    },
    {
      "question": "Why does this code produce a SyntaxError?",
      "code": [
        "def func():",
        "    print('Hello'",
        ""
      ],
      "options": [
        "a) The closing parenthesis is missing in the print statement.",
        "b) The function name 'func' is invalid.",
        "c) Python functions must return a value.",
        "d) There is no error, the code runs fine."
      ],
      "answer": "a) The closing parenthesis is missing in the print statement."
    },
    {
      "question": "Why does this code raise a ValueError?",
      "code": [
        "int_value = int('abc')",
        "print(int_value)"
      ],
      "options": [
        "a) The string 'abc' cannot be converted to an integer.",
        "b) The print statement is incorrect.",
        "c) Python cannot convert strings to integers.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) The string 'abc' cannot be converted to an integer."
    },
    {
      "question": "Why does this code raise an IndentationError?",
      "code": [
        "def func():",
        "print('Hello')"
      ],
      "options": [
        "a) The body of the function is not indented.",
        "b) The print statement is incorrect.",
        "c) The function name 'func' is invalid.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) The body of the function is not indented."
    },
    {
      "question": "Why does this code raise a TypeError?",
      "code": [
        "def multiply(a, b):",
        "    return a * b",
        "",
        "result = multiply(5, None)",
        "print(result)"
      ],
      "options": [
        "a) You cannot multiply an integer with None.",
        "b) The function multiply is not defined correctly.",
        "c) The print statement is causing the error.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) You cannot multiply an integer with None."
    }
]
  
const java = [
    {
      "question": "Why does this code throw a NullPointerException?",
      "code": [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        String str = null;",
        "        System.out.println(str.length());",
        "    }",
        "}"
      ],
      "options": [
        "a) The variable 'str' is not initialized.",
        "b) You cannot call methods on a null object.",
        "c) The length() method does not exist for Strings.",
        "d) No error, the code runs fine."
      ],
      "answer": "b) You cannot call methods on a null object."
    },
    {
      "question": "Why does this code fail to compile?",
      "code": [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        int number = \"123\";",
        "        System.out.println(number);",
        "    }",
        "}"
      ],
      "options": [
        "a) Strings cannot be assigned to integers directly.",
        "b) The variable 'number' is not initialized.",
        "c) The println() method is incorrect.",
        "d) No error, the code compiles and runs fine."
      ],
      "answer": "a) Strings cannot be assigned to integers directly."
    },
    {
      "question": "Why does this code throw an ArrayIndexOutOfBoundsException?",
      "code": [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        int[] arr = {1, 2, 3};",
        "        System.out.println(arr[3]);",
        "    }",
        "}"
      ],
      "options": [
        "a) The array index is out of bounds.",
        "b) The array is not initialized.",
        "c) The print statement is incorrect.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) The array index is out of bounds."
    },
    {
      "question": "Why does this code fail with a ClassCastException?",
      "code": [
        "import java.util.ArrayList;",
        "public class Main {",
        "    public static void main(String[] args) {",
        "        ArrayList list = new ArrayList();",
        "        list.add(\"Hello\");",
        "        Integer num = (Integer) list.get(0);",
        "        System.out.println(num);",
        "    }",
        "}"
      ],
      "options": [
        "a) You cannot cast a String to an Integer.",
        "b) The ArrayList is not initialized properly.",
        "c) The list does not support generics.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) You cannot cast a String to an Integer."
    },
    {
      "question": "Why does this code fail with a NumberFormatException?",
      "code": [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        String number = \"abc\";",
        "        int value = Integer.parseInt(number);",
        "        System.out.println(value);",
        "    }",
        "}"
      ],
      "options": [
        "a) The string 'abc' cannot be parsed to an integer.",
        "b) The parseInt method does not exist in Java.",
        "c) Strings cannot be converted to integers.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) The string 'abc' cannot be parsed to an integer."
    },
    {
      "question": "Why does this code throw an IllegalArgumentException?",
      "code": [
        "import java.util.Scanner;",
        "public class Main {",
        "    public static void main(String[] args) {",
        "        Scanner scanner = new Scanner(System.in);",
        "        System.out.print(\"Enter a positive number: \");",
        "        int number = scanner.nextInt();",
        "        if (number < 0) {",
        "            throw new IllegalArgumentException(\"Number must be positive\");",
        "        }",
        "        System.out.println(\"Number: \" + number);",
        "    }",
        "}"
      ],
      "options": [
        "a) A negative number was entered.",
        "b) Scanner does not support integer inputs.",
        "c) IllegalArgumentException is not a valid exception.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) A negative number was entered."
    },
    {
      "question": "Why does this code fail with a compilation error?",
      "code": [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        System.out.println(\"Hello World\")",
        "    }",
        "}"
      ],
      "options": [
        "a) Missing semicolon in the print statement.",
        "b) The main method is not defined correctly.",
        "c) The class name is invalid.",
        "d) No error, the code compiles and runs fine."
      ],
      "answer": "a) Missing semicolon in the print statement."
    },
    {
      "question": "Why does this code fail to compile?",
      "code": [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        final int x = 10;",
        "        x = 20;",
        "        System.out.println(x);",
        "    }",
        "}"
      ],
      "options": [
        "a) A final variable cannot be reassigned.",
        "b) The variable x is not initialized.",
        "c) The final keyword is not valid for integers.",
        "d) No error, the code compiles and runs fine."
      ],
      "answer": "a) A final variable cannot be reassigned."
    },
    {
      "question": "Why does this code throw an UnsupportedOperationException?",
      "code": [
        "import java.util.Arrays;",
        "import java.util.List;",
        "public class Main {",
        "    public static void main(String[] args) {",
        "        List<String> list = Arrays.asList(\"A\", \"B\", \"C\");",
        "        list.add(\"D\");",
        "        System.out.println(list);",
        "    }",
        "}"
      ],
      "options": [
        "a) Arrays.asList() creates a fixed-size list.",
        "b) The list is null.",
        "c) You cannot add elements to a list in Java.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) Arrays.asList() creates a fixed-size list."
    },
    {
      "question": "Why does this code cause a StackOverflowError?",
      "code": [
        "public class Main {",
        "    public static void main(String[] args) {",
        "        recursiveMethod();",
        "    }",
        "",
        "    public static void recursiveMethod() {",
        "        recursiveMethod();",
        "    }",
        "}"
      ],
      "options": [
        "a) Infinite recursion leads to a stack overflow.",
        "b) The method recursiveMethod() is not defined correctly.",
        "c) The main method should not call another method.",
        "d) No error, the code runs fine."
      ],
      "answer": "a) Infinite recursion leads to a stack overflow."
    }
]
const generate = ()=>{
    return Math.floor(Math.random() * (101));
}

exports.debugging = async(req, res) => {
    const {language} = req.params;
    let arr;
    if(language === 'cpp') arr = cpp;
    else if(language === 'py') arr = py;
    else arr = java;
    let ques = [];
    for(let i = 0; i < 5; i++){
        let rand = generate()%arr.length;
        ques.push(arr[rand]);
    }
    return res.status(200).json({
        success: true,
        data: ques
    })
}