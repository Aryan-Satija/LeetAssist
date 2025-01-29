const cpp = [  
  {  
    "question": "What does this code output?",  
    "code": [  
      "auto x = {1, 2};",  
      "std::cout << x.size();"  
    ],  
    "options": [  
      "a) 2",  
      "b) 1",  
      "c) Compiler error",  
      "d) Undefined behavior"  
    ],  
    "answer": "a) 2",  
    "explanation": "`auto x = {1, 2}` deduces `x` as `std::initializer_list<int>`, which has size 2."  
  },  
  {  
    "question": "What happens here?",  
    "code": [  
      "std::string s1 = \"Hello\";",  
      "std::string&& s2 = std::move(s1);",  
      "std::cout << s1;"  
    ],  
    "options": [  
      "a) Prints \"Hello\"",  
      "b) Prints garbage",  
      "c) Undefined behavior",  
      "d) Compiler error"  
    ],  
    "answer": "a) Prints \"Hello\"",  
    "explanation": "`std::move` casts to an rvalue reference but doesn't invalidate `s1`; its state is implementation-defined but often unchanged."  
  },  
  {  
    "question": "Debugging challenge: Why does this crash?",  
    "code": [  
      "std::vector<int> v = {1, 2, 3};",  
      "for (auto it = v.begin(); it != v.end(); ++it) {",  
      "    if (*it % 2 == 0) v.erase(it);",  
      "}"  
    ],  
    "options": [  
      "a) Invalid iterator after `erase`",  
      "b) Out-of-bounds access",  
      "c) Memory leak",  
      "d) Division by zero"  
    ],  
    "answer": "a) Invalid iterator after `erase`",  
    "explanation": "`erase` invalidates `it`; use `it = v.erase(it)` instead."  
  },  
  {  
    "question": "What is printed?",  
    "code": [  
      "int x = 0;",  
      "int&& y = x++;",  
      "std::cout << y;"  
    ],  
    "options": [  
      "a) 0",  
      "b) 1",  
      "c) Compiler error",  
      "d) Garbage"  
    ],  
    "answer": "c) Compiler error",  
    "explanation": "Cannot bind an rvalue reference (`y`) to the temporary result of `x++` (an rvalue)."  
  },  
  {  
    "question": "Which function is called?",  
    "code": [  
      "void foo(int) { std::cout << \"int\"; }",  
      "void foo(double) { std::cout << \"double\"; }",  
      "int main() { foo(3.14f); }"  
    ],  
    "options": [  
      "a) `int`",  
      "b) `double`",  
      "c) Ambiguity error",  
      "d) Undefined behavior"  
    ],  
    "answer": "b) `double`",  
    "explanation": "`float` promotes to `double` over `int` in overload resolution."  
  },  
  {  
    "question": "What is the output?",  
    "code": [  
      "struct A {",  
      "    virtual ~A() { std::cout << \"A\"; }",  
      "};",  
      "struct B : A {",  
      "    ~B() { std::cout << \"B\"; }",  
      "};",  
      "int main() { A* ptr = new B(); delete ptr; }"  
    ],  
    "options": [  
      "a) AB",  
      "b) BA",  
      "c) A",  
      "d) Compiler error"  
    ],  
    "answer": "a) AB",  
    "explanation": "Virtual destructor ensures `B::~B()` is called first, then `A::~A()`."  
  },  
  {  
    "question": "What does this code do?",  
    "code": [  
      "int x = 10;",  
      "auto f = [&x]() { return ++x; };",  
      "std::cout << f() << f();"  
    ],  
    "options": [  
      "a) 11 12",  
      "b) 12 12",  
      "c) Undefined behavior",  
      "d) Compiler error"  
    ],  
    "answer": "c) Undefined behavior",  
    "explanation": "Order of evaluation for `f() << f()` is unspecified, leading to UB."  
  },  
  {  
    "question": "Debugging challenge: Why is there a memory leak?",  
    "code": [  
      "class Resource {",  
      "    int* data;",  
      "public:",  
      "    Resource() : data(new int[100]) {}",  
      "    ~Resource() { delete data; }",  
      "};",  
      "int main() { Resource res; }"  
    ],  
    "options": [  
      "a) `delete data` should be `delete[] data`",  
      "b) Missing copy constructor",  
      "c) Stack overflow",  
      "d) No leak"  
    ],  
    "answer": "a) `delete data` should be `delete[] data`",  
    "explanation": "Mismatched `new[]`/`delete` causes UB and potential leaks."  
  },  
  {  
    "question": "What is printed?",  
    "code": [  
      "template<typename T>",  
      "void bar(T a, T b) { std::cout << \"T\"; }",  
      "void bar(int a, double b) { std::cout << \"ID\"; }",  
      "int main() { bar(1, 2.0f); }"  
    ],  
    "options": [  
      "a) T",  
      "b) ID",  
      "c) Ambiguity error",  
      "d) Compiler error"  
    ],  
    "answer": "b) ID",  
    "explanation": "Overload resolution prefers non-template `void bar(int, double)` over template deduction (`T=float`)."  
  },  
  {  
    "question": "What is the result?",  
    "code": [  
      "constexpr int f() {",  
      "    int x = 5;",  
      "    return x++;",  
      "}",  
      "int main() { std::cout << f(); }"  
    ],  
    "options": [  
      "a) 5",  
      "b) 6",  
      "c) Compiler error",  
      "d) Undefined behavior"  
    ],  
    "answer": "c) Compiler error",  
    "explanation": "Modifying a variable (`x++`) in a `constexpr` function is allowed only in C++14 and later."  
  }  
];

const py = [
  {
    "question": "What does this code output?",
    "code": [
      "def func(lst=[]):",
      "    lst.append(1)",
      "    print(len(lst))",
      "func()",
      "func()"
    ],
    "options": [
      "a) 1 1",
      "b) 1 2",
      "c) 2 2",
      "d) Error"
    ],
    "answer": "b) 1 2",
    "explanation": "Default mutable arguments (like `lst=[]`) are created once. Subsequent calls reuse the same list."
  },
  {
    "question": "What is printed?",
    "code": [
      "funcs = [lambda: i for i in range(3)]",
      "for f in funcs:",
      "    print(f(), end=' ')"
    ],
    "options": [
      "a) 0 1 2",
      "b) 2 2 2",
      "c) 3 3 3",
      "d) Error"
    ],
    "answer": "b) 2 2 2",
    "explanation": "Lambdas capture the variable `i`, not its value. By the time they execute, `i` is 2."
  },
  {
    "question": "What does `print(a is b)` output?",
    "code": [
      "a = 256",
      "b = 256",
      "print(a is b, end=' ')",
      "c = 257",
      "d = 257",
      "print(c is d)"
    ],
    "options": [
      "a) True True",
      "b) True False",
      "c) False False",
      "d) Depends on Python"
    ],
    "answer": "b) True False",
    "explanation": "Python caches integers in [-5, 256]. `257` creates new objects (behavior may vary in REPL vs. scripts)."
  },
  {
    "question": "Debugging: Why does this crash?",
    "code": [
      "a = [[]] * 3",
      "a[0].append(1)",
      "print(a)"
    ],
    "options": [
      "a) [[1], [1], [1]] is printed (no crash)",
      "b) All sublists share the same reference",
      "c) IndexError",
      "d) Memory leak"
    ],
    "answer": "b) All sublists share the same reference",
    "explanation": "`[[]] * 3` creates 3 references to the same inner list. Appending to one affects all."
  },
  {
    "question": "What is the result?",
    "code": [
      "x = [1, 2, 3]",
      "y = x",
      "y.append(4)",
      "print(x)"
    ],
    "options": [
      "a) [1, 2, 3]",
      "b) [1, 2, 3, 4]",
      "c) Error",
      "d) [4, 3, 2, 1]"
    ],
    "answer": "b) [1, 2, 3, 4]",
    "explanation": "Assignment `y = x` creates a reference (not a copy). Changes to `y` affect `x`."
  },
  {
    "question": "What does this code output?",
    "code": [
      "print(3 * 'ab' + 'c')"
    ],
    "options": [
      "a) ababc",
      "b) ababab c",
      "c) abababc",
      "d) Error"
    ],
    "answer": "c) abababc",
    "explanation": "`3 * 'ab'` evaluates to `ababab`, then `+ 'c'` appends `c`."
  },
  {
    "question": "Debugging: Why does this raise an error?",
    "code": [
      "d = {[1, 2]: 'value'}"
    ],
    "options": [
      "a) List cannot be a key",
      "b) Syntax error",
      "c) Key not found",
      "d) Hash collision"
    ],
    "answer": "a) List cannot be a key",
    "explanation": "Dictionary keys must be hashable. Lists are mutable and unhashable."
  },
  {
    "question": "What is printed?",
    "code": [
      "a = (1, 2, [3])",
      "a[2].append(4)",
      "print(a)"
    ],
    "options": [
      "a) (1, 2, [3, 4])",
      "b) Error (tuple is immutable)",
      "c) (1, 2, 4)",
      "d) (1, 2, [3])"
    ],
    "answer": "a) (1, 2, [3, 4])",
    "explanation": "Tuples are immutable, but their mutable elements (like the inner list) can be modified."
  },
  {
    "question": "What does `print(0.1 + 0.2 == 0.3)` output?",
    "code": [],
    "options": [
      "a) True",
      "b) False",
      "c) Depends on hardware",
      "d) Error"
    ],
    "answer": "b) False",
    "explanation": "Floating-point precision errors: `0.1 + 0.2` ≈ `0.30000000000000004`, not exactly `0.3`."
  },
  {
    "question": "Debugging: Why does this loop infinitely?",
    "code": [
      "i = 1",
      "while i < 5:",
      "    if i % 2 == 0:",
      "        continue",
      "    i += 1"
    ],
    "options": [
      "a) `i` never updates when even",
      "b) Off-by-one error",
      "c) Syntax error",
      "d) `continue` skips `i += 1`"
    ],
    "answer": "a) `i` never updates when even",
    "explanation": "When `i` is even, `continue` skips `i += 1`, causing an infinite loop."
  }
]

const java = [
  {
    "question": "What does this code output?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        System.out.println(2 + 3 + \"5\");",
      "    }",
      "}"
    ],
    "options": [
      "a) 55",
      "b) 235",
      "c) 10",
      "d) Error"
    ],
    "answer": "a) 55",
    "explanation": "`2 + 3` is evaluated first (resulting in `5`), then concatenated with `\"5\"` to produce `\"55\"`."
  },
  {
    "question": "What is printed?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        String s1 = new String(\"Hello\");",
      "        String s2 = new String(\"Hello\");",
      "        System.out.println(s1 == s2);",
      "    }",
      "}"
    ],
    "options": [
      "a) true",
      "b) false",
      "c) Error",
      "d) Depends on JVM"
    ],
    "answer": "b) false",
    "explanation": "`==` compares references. `s1` and `s2` are different objects, even though their content is the same."
  },
  {
    "question": "What does this code output?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        int x = 5;",
      "        System.out.println(x > 2 ? x < 4 ? 10 : 8 : 7);",
      "    }",
      "}"
    ],
    "options": [
      "a) 10",
      "b) 8",
      "c) 7",
      "d) Error"
    ],
    "answer": "b) 8",
    "explanation": "Ternary operators are evaluated left-to-right: `x > 2` is true, so `x < 4 ? 10 : 8` is evaluated. Since `x < 4` is false, `8` is returned."
  },
  {
    "question": "Debugging: Why does this throw a `NullPointerException`?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        String s = null;",
      "        System.out.println(s.length());",
      "    }",
      "}"
    ],
    "options": [
      "a) `s` is not initialized",
      "b) `s` is null",
      "c) `length()` cannot be called on `null`",
      "d) Syntax error"
    ],
    "answer": "c) `length()` cannot be called on `null`",
    "explanation": "Calling a method on a `null` reference throws a `NullPointerException`."
  },
  {
    "question": "What is printed?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        int[] arr = {1, 2, 3};",
      "        System.out.println(arr[3]);",
      "    }",
      "}"
    ],
    "options": [
      "a) 3",
      "b) 0",
      "c) Error (ArrayIndexOutOfBoundsException)",
      "d) null"
    ],
    "answer": "c) Error (ArrayIndexOutOfBoundsException)",
    "explanation": "Accessing `arr[3]` is out of bounds since the array has indices `0` to `2`."
  },
  {
    "question": "What does this code output?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        System.out.println(Math.min(Double.MIN_VALUE, 0.0));",
      "    }",
      "}"
    ],
    "options": [
      "a) 0.0",
      "b) Double.MIN_VALUE",
      "c) Error",
      "d) Depends on JVM"
    ],
    "answer": "a) 0.0",
    "explanation": "`Double.MIN_VALUE` is the smallest positive value (≈4.9e-324), so `0.0` is smaller."
  },
  {
    "question": "What is printed?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        String s1 = \"Hello\";",
      "        String s2 = \"Hello\";",
      "        System.out.println(s1 == s2);",
      "    }",
      "}"
    ],
    "options": [
      "a) true",
      "b) false",
      "c) Error",
      "d) Depends on JVM"
    ],
    "answer": "a) true",
    "explanation": "String literals are interned, so `s1` and `s2` refer to the same object in the string pool."
  },
  {
    "question": "Debugging: Why does this throw a `ClassCastException`?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        Object obj = new Integer(5);",
      "        String s = (String) obj;",
      "    }",
      "}"
    ],
    "options": [
      "a) `Integer` cannot be cast to `String`",
      "b) `obj` is not a `String`",
      "c) `Integer` is not a subclass of `String`",
      "d) Syntax error"
    ],
    "answer": "a) `Integer` cannot be cast to `String`",
    "explanation": "Casting an `Integer` to a `String` is invalid and throws a `ClassCastException`."
  },
  {
    "question": "What does this code output?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        int x = 10;",
      "        System.out.println(x++ + ++x);",
      "    }",
      "}"
    ],
    "options": [
      "a) 20",
      "b) 21",
      "c) 22",
      "d) Error"
    ],
    "answer": "c) 22",
    "explanation": "`x++` returns `10` (then `x` becomes `11`), and `++x` returns `12` (after incrementing `x` to `12`). The sum is `10 + 12 = 22`."
  },
  {
    "question": "What is printed?",
    "code": [
      "public class Main {",
      "    public static void main(String[] args) {",
      "        System.out.println(0.1 + 0.2 == 0.3);",
      "    }",
      "}"
    ],
    "options": [
      "a) true",
      "b) false",
      "c) Error",
      "d) Depends on JVM"
    ],
    "answer": "b) false",
    "explanation": "Floating-point precision errors: `0.1 + 0.2` ≈ `0.30000000000000004`, not exactly `0.3`."
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