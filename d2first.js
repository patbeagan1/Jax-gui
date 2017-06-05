var nodes = [{
  "id": 0,
  "imports": ["com.google.gson.JsonParser", "com.google.gson.JsonSyntaxException", "com.thoughtworks.qdox.JavaProjectBuilder", "com.thoughtworks.qdox.model.*", "org.apache.commons.lang3.StringEscapeUtils", "java.io.File",
    "java.io.FileNotFoundException", "java.util.Iterator"
  ],
  "classes": [{
    "name": "testing",
    "constructors": [],
    "implements": [],
    "interfaces": [],
    "nestedClass": [],
    "modifiers": [],
    "vars": [],
    "methods": [{
      "name": "quote",
      "type": "java.lang.String",
      "modifiers": [],
      "source": ""
    }]
  }, {
    "name": "Main",
    "constructors": ["private Main(int t) {\n\n        this.START_ARRAY = \"\";\n    }\n", "private Main() {\n\n\n    }\n"],
    "implements": ["testing"],
    "interfaces": ["testing"],
    "nestedClass": [{
      "name": "Dog",
      "constructors": [],
      "implements": [],
      "interfaces": [],
      "nestedClass": [],
      "modifiers": [],
      "vars": [{
        "name": "t",
        "type": "int",
        "modifiers": [],
        "value": ""
      }],
      "methods": []
    }],
    "modifiers": ["public"],
    "vars": [{
      "name": "COMMA",
      "type": "String",
      "modifiers": ["private", "static", "final"],
      "value": "\",\""
    }, {
      "name": "END_OBJECT",
      "type": "String",
      "modifiers": ["private"],
      "value": "\"}\""
    }, {
      "name": "START_OBJECT",
      "type": "String",
      "modifiers": ["private"],
      "value": "\"{\""
    }, {
      "name": "END_ARRAY",
      "type": "String",
      "modifiers": ["private"],
      "value": "\"]\""
    }, {
      "name": "START_ARRAY",
      "type": "String",
      "modifiers": ["private"],
      "value": "\"[\""
    }],
    "methods": [{
      "name": "main",
      "type": "void",
      "modifiers": ["public", "static"],
      "source": "\n        Main main = new Main();\n        try {\n            if (args.length != 1) {\n                System.out.println(\"This program takes the target directory as a parameter.\");\n            } else {\n                main.start(args[0]);\n            }\n        } catch (FileNotFoundException e) {\n            e.printStackTrace();\n        }\n    "
    }, {
      "name": "start",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        JavaProjectBuilder javaProjectBuilder = new JavaProjectBuilder();\n        javaProjectBuilder.addSourceTree(new File(targetDir));\n        StringBuilder s = new StringBuilder();\n        s.append(START_ARRAY);\n        Iterator<JavaSource> javaSourceIterator = javaProjectBuilder.getSources().iterator();\n        JavaSource javaSource;\n        int iteratorCount = 0;\n        if (javaSourceIterator.hasNext()) {\n            javaSource = javaSourceIterator.next();\n            s.append(START_OBJECT)\n                    .append(quote(\"id\"))\n                    .append(\":\")\n                    .append(iteratorCount++);\n            s.append(COMMA);\n            getImports(javaSource, s);\n            s.append(COMMA);\n            getClasses(javaSource, s);\n            s.append(END_OBJECT);\n            while (javaSourceIterator.hasNext()) {\n                javaSource = javaSourceIterator.next();\n                s.append(COMMA);\n                s.append(START_OBJECT)\n                        .append(quote(\"id\"))\n                        .append(\":\")\n                        .append(iteratorCount++);\n                s.append(COMMA);\n                getImports(javaSource, s);\n                s.append(COMMA);\n                getClasses(javaSource, s);\n                s.append(END_OBJECT);\n            }\n        }\n        s.append(END_ARRAY);\n\n        try {\n            JsonParser parser = new JsonParser();\n            parser.parse(s.toString());\n        } catch (JsonSyntaxException jse) {\n            System.out.println(\"Not a valid Json String:\" + jse.getMessage());\n        }\n        System.out.print(s.toString());\n    "
    }, {
      "name": "getClasses",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        s.append(quote(\"classes\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<JavaClass> javaClassIterator = javaSource.getClasses().iterator();\n        if (javaClassIterator.hasNext()) {\n            getClass(s, javaClassIterator.next());\n            while (javaClassIterator.hasNext()) {\n                s.append(COMMA);\n                getClass(s, javaClassIterator.next());\n            }\n        }\n        s.append(END_ARRAY);\n    "
    }, {
      "name": "getClass",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        s.append(START_OBJECT);\n\n        s.append(quote(\"name\"))\n                .append(\":\")\n                .append(quote(javaClass.getName()));\n        s.append(COMMA);\n\n        s.append(quote(\"constructors\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<JavaConstructor> javaConstructorIterator = javaClass.getConstructors().iterator();\n        if (javaConstructorIterator.hasNext()) {\n            s.append(quote(javaConstructorIterator.next().getCodeBlock()));\n            while (javaConstructorIterator.hasNext()) {\n                s.append(COMMA);\n                s.append(quote(javaConstructorIterator.next().getCodeBlock()));\n            }\n        }\n        s.append(END_ARRAY);\n        s.append(COMMA);\n\n        s.append(quote(\"implements\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<JavaType> javaTypeIterator = javaClass.getImplements().iterator();\n        if (javaTypeIterator.hasNext()) {\n            s.append(quote(javaTypeIterator.next().getFullyQualifiedName()));\n            while (javaTypeIterator.hasNext()) {\n                s.append(COMMA);\n                s.append(quote(javaTypeIterator.next().getFullyQualifiedName()));\n            }\n        }\n        s.append(END_ARRAY);\n        s.append(COMMA);\n\n        s.append(quote(\"interfaces\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<JavaClass> javaClassIterator = javaClass.getInterfaces().iterator();\n        if (javaClassIterator.hasNext()) {\n            s.append(quote(javaClassIterator.next().getFullyQualifiedName()));\n            while (javaClassIterator.hasNext()) {\n                s.append(COMMA);\n                s.append(quote(javaClassIterator.next().getFullyQualifiedName()));\n            }\n        }\n        s.append(END_ARRAY);\n        s.append(COMMA);\n\n        s.append(quote(\"nestedClass\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<JavaClass> javaClassIterator1 = javaClass.getNestedClasses().iterator();\n        if (javaClassIterator1.hasNext()) {\n            getClass(s, javaClassIterator1.next());\n            while (javaClassIterator1.hasNext()) {\n                s.append(COMMA);\n                getClass(s, javaClassIterator1.next());\n            }\n        }\n        s.append(END_ARRAY);\n        s.append(COMMA);\n\n        s.append(quote(\"modifiers\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<String> stringIterator = javaClass.getModifiers().iterator();\n        if (stringIterator.hasNext()) {\n            s.append(quote(stringIterator.next()));\n            while (stringIterator.hasNext()) {\n                s.append(COMMA);\n                s.append(quote(stringIterator.next()));\n            }\n        }\n        s.append(END_ARRAY);\n        s.append(COMMA);\n\n        getFields(javaClass, s);\n        s.append(COMMA);\n\n        getMethods(javaClass, s);\n        s.append(END_OBJECT);\n    "
    }, {
      "name": "getMethods",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        s.append(quote(\"methods\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<JavaMethod> javaMethodIterator = javaClass.getMethods().iterator();\n        if (javaMethodIterator.hasNext()) {\n            getMethod(javaMethodIterator.next(), s);\n            while (javaMethodIterator.hasNext()) {\n                s.append(COMMA);\n                getMethod(javaMethodIterator.next(), s);\n            }\n        }\n        s.append(END_ARRAY);\n    "
    }, {
      "name": "getImports",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        s.append(quote(\"imports\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<String> stringIterator = javaSource.getImports().iterator();\n        if (stringIterator.hasNext()) {\n            s.append(quote(stringIterator.next()));\n            while (stringIterator.hasNext()) {\n                s.append(COMMA);\n                s.append(quote(stringIterator.next()));\n            }\n        }\n        s.append(END_ARRAY);\n    "
    }, {
      "name": "getMethod",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        s.append(START_OBJECT)\n                .append(quote(\"name\"))\n                .append(\":\")\n                .append(quote(javaMethod.getName()))\n                .append(COMMA)\n                .append(quote(\"type\"))\n                .append(\":\")\n                .append(quote(javaMethod.getReturnType().getCanonicalName()))\n                .append(COMMA)\n                .append(quote(\"modifiers\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<String> stringIterator = javaMethod.getModifiers().iterator();\n        if (stringIterator.hasNext()) {\n            s.append(quote(stringIterator.next()));\n            while (stringIterator.hasNext()) {\n                s.append(COMMA);\n                s.append(quote(stringIterator.next()));\n            }\n        }\n        s.append(END_ARRAY)\n                .append(COMMA)\n                .append(quote(\"source\"))\n                .append(\":\")\n                .append(quote(javaMethod.getSourceCode()))\n                .append(END_OBJECT);\n    "
    }, {
      "name": "getFields",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        s.append(quote(\"vars\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<JavaField> javaFieldIterator = javaClass.getFields().iterator();\n        if (javaFieldIterator.hasNext()) {\n            getField(javaFieldIterator.next(), s);\n            while (javaFieldIterator.hasNext()) {\n                s.append(COMMA);\n                getField(javaFieldIterator.next(), s);\n            }\n        }\n        s.append(END_ARRAY);\n    "
    }, {
      "name": "getField",
      "type": "void",
      "modifiers": ["private"],
      "source": "\n        s.append(START_OBJECT)\n                .append(quote(\"name\"))\n                .append(\":\")\n                .append(quote(javaField.getName()))\n                .append(COMMA)\n                .append(quote(\"type\"))\n                .append(\":\")\n                .append(quote(javaField.getType().getName()))\n                .append(COMMA)\n                .append(quote(\"modifiers\"))\n                .append(\":\")\n                .append(START_ARRAY);\n        Iterator<String> stringIterator = javaField.getModifiers().iterator();\n        if (stringIterator.hasNext()) {\n            s.append(quote(stringIterator.next()));\n            while (stringIterator.hasNext()) {\n                s.append(COMMA);\n                s.append(quote(stringIterator.next()));\n            }\n        }\n        s.append(END_ARRAY)\n                .append(COMMA)\n                .append(quote(\"value\"))\n                .append(\":\")\n                .append(quote(javaField.getInitializationExpression()))\n                .append(END_OBJECT);\n    "
    }, {
      "name": "quote",
      "type": "java.lang.String",
      "modifiers": ["public"],
      "source": "\n        return \"\\\"\" + StringEscapeUtils.escapeJson(s) + \"\\\"\";\n    "
    }]
  }]
}, {
  "id": 1,
  "imports": [],
  "classes": [{
    "name": "Cat",
    "constructors": [],
    "implements": [],
    "interfaces": [],
    "nestedClass": [],
    "modifiers": ["public"],
    "vars": [],
    "methods": []
  }]
}];
