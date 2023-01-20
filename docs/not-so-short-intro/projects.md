# Source files and projects

As we already know, when working with ConTeXt we always start with a text
file in which, along with the contents of the final document, a number of
instructions are included, telling ConTeXt about the transformations it
must apply to generate our final correctly formatted document in PDF from
the source file.

Thinking of the readers who until now have only known how to work with word
processors, I think it is worth spending some time with the source file
itself. Or rather, source files, since there are times where there is only
one source file and others when we use a number of source files to arrive
at the final document. In this last instance we can talk about
“multifile projects”.

## Encoding source files

The source file(s), need to be text files. In computer terminology, this is
the name given to a file containing only human-readable text which does not
include binary code. These files are also called *simple text* or *plain text* files.

Since internally, computer systems only process binary numbers, a text file
is really made up of *numbers* that represent *characters*. A *table* is used to connect a number with a character. For text files, there
are several possible tables. The term *text file encoding* refers to
the specific character-matching table that a particular text file uses.

!!! note ""
    
    The existence of different encoding tables for text files is a
    consequence of the history of computer science itself. In the early
    stages of development, when the memory and storage capacity of computer
    devices was scarce, it was decided to use a table called ASCII (standing
    for “*American Standard Code for Information Interchange*”)
    that only allowed 128 characters and was established in 1963 by the US
    Standards Committee. It is obvious that 128 characters is not enough to
    represent all the characters and symbols used in all the languages of the
    world; but it was more than enough to represent English which is, of all
    Western languages, the  one that has fewer characters, because it does
    not use any diacritics (accents and other marks above or below or through
    other letters). The advantage of using ASCII was that text files would
    take up very little space, as 127 (the highest number in the table) can
    be represented by a 7-digit binary number, and the first computers used
    the byte as a unit for measuring memory, an 8-digit binary number. Any
    character in the table would fit into a single byte. Since the byte has 8
    digits and ASCII used only 7 digits, there was even space left to add
    some other characters to represent other languages.
  
    But when the use of computers expanded, the inadequacy of ASCII became
    apparent and it became necessary to develop *alternative* tables that
    included characters not known to the English alphabet such as the Spanish
    ‘ñ’, accented vowels, the Catalan or French ‘ç’, etc. On the
    other hand, there was no initial agreement as to what these *alternative tables* of ASCII should be, so different specialised computer
    companies gradually tackled the problem on their own. Therefore, not only
    were specific tables created for different languages or groups of
    languages, but also different tables according to the company that had
    created them (Microsoft, Apple, IBM, etc.).
  
    It was only with the increase in computer memory and the lower cost of
    storage devices and the corresponding increase in capacity that the idea
    of creating a single table that could be used for all languages arose.
    But, once again, it was not actually a single table containing all the
    characters that was created, but a standard encoding (called Unicode) along with different ways of representing it (UTF-8, UTF-16,
    UTF-32, etc.) Of all these systems, the one that has ended up becoming
    the de facto standard is UTF-8, which makes it possible to represent
    practically any living language, and many already extinct languages, as
    well as numerous additional symbols, all using numbers of variable length
    (between 1 and 4 bytes), which, in turn, helps to optimise the size of
    text files. This size has not increased *too much* compared to files
    using pure ASCII.
  
    Up until XeTeX appeared, systems based on TeX -- which was also  born
    in the US and therefore has English as it native language -- assumed the
    encoding was in pure ASCII; so that to use a different encoding, you had
    to indicate this somehow in the source file.
  


ConTeXt Mark&nbsp;IV assumes that the encoding will be UTF-8.
However, in less up-to-date computer systems, a different encoding may
still be used by default. I am not very sure about the default encoding
that Windows uses, given that Microsoft's strategy for reaching out to the
wider public consists in hiding the complexity (but even though hidden, it
does not mean it has disappeared!). There is not much information available
(or I have not been able to find it) regarding the encoding system it uses
by default.

In any case, whatever the default encoding, any text editor allows you to
save the file in the desired encoding. The source files intended to be
processed by ConTeXt Mark IV must be saved in UTF-8, unless, of course,
there is a very good reason for using a different encoding (although I
cannot think what this reason might be).

If we want to write a file written in another encoding (perhaps an old
file) we can

- Convert the file to UTF-8, the recommended option, and there are
various tools for doing this; in Linux, for example, the commands  `iconv` or `recode`.

- Tell ConTeXt in the source file that the encoding is not UTF-8. To
do this we need to use the command `\enableregime`, the syntax of which
is:

`\enableregime[Encoding]`

where *Encoding* refers to the name by which ConTeXt knows the actual
encoding of the file in question. In the \in{table}[encodings] you will
find the various encodings and the names that ConTeXt knows them by.

| Encoding                 | Name(s) in ConTeXt         | Notes          |
|--------------------------|----------------------------|----------------|
| Windows CP 1250          | cp1250, windows-1250       | Western Europe |
| Windows CP 1251          | cp1251, windows-1251       | Cyrillic       |
| Windows CP 1252          | cp1252, win, windows-1252  | Western Europe |
| Windows CP 1253          | cp1253, windows-1253       | Greek          |
| Windows CP 1254          | cp1254, windows-1254       | Turkish        |
| Windows CP 1257          | cp1257, windows-1257       | Baltic         |
| ISO-8859-1, ISO Latin 1  | iso-8859-1, latin1, il1    | Western Europe |
| ISO-8859-2, ISO Latin 2  | iso-8859-2, latin2, il2    | Western Europe |
| ISO-8859-15, ISO Latin 9 | iso-8859-15,  latin9,  il9 | Western Europe |
| ISO-8859-7               | iso-8859-7,  grk           | Greek          |
| Mac Roman                | mac                        | Western Europe |
| IBM PC DOS               | ibm                        | Western Europe |
| UTF-8                    | utf                        | Unicode        |
| VISCII                   | vis,  viscii               | Vietnamese     |
| DOS CP 866               | cp866, cp866nav            | Cyrillic       |
| KOI8                     | koi8-r, koi8-u, koi8-ru    | Cyrillic       |
| Mac Cyrillic             | maccyr, macukr             | Cyrillic       |
| Others                   | cp855, cp866av, cp866mav,<br> cp866tat, ctt, dbk, iso88595,<br> isoir111, mik, mls, mnk, mos, ncc | Various |

(Table 4.1: Main encodings in ConTeXt)

ConTeXt Mk IV strongly recommends the use of UTF-8. I agree with this
recommendation. From here on in this introduction, we can assume that the
encoding is always UTF-8.

!!! note ""
    
    Along with `\enableregime` ConTeXt includes the command
    `\useregime` which allows us to use the code for
    one or other encodings as an argument. I have found no information about
    this command nor how it differs from `\enableregime`, only some
    examples of its \Conjecture use. I suspect that `\useregime` is
    designed for complex projects that use many source files, with the
    expectation that not all of them will have the same coding. But it is
    only a guess.


## Characters in the source file(s) that ConTeXt treats in a special way

*Special characters* is the name I will give to a group of characters
that are different from *reserved characters*. As seen in
\in{section}[sec:reserved characters], they are ones that have a special
meaning for ConTeXt and so cannot be used directly as characters in the
source file. Along with these there is another group of characters that,
although treated as such by ConTeXt when it finds them in the source
file, it does treat them with special rules. This group includes blank
spaces (white space), tabs, line breaks and hyphens.

### Blank spaces (white space) and tabs

Tabs and blank spaces are treated the same in the source file for all
intents and purposes. A tab character (the Tab key on the keyboard) will be
transformed into white space by ConTeXt. And blank spaces are absorbed
into any other blank space (or tab) immediately following them. Thus, it
makes absolutely no difference in the source file to write

`Tweedledum and Tweedledee.`

or

`Tweedledum   and   Tweedledee.`

ConTeXt considers these two sentences to be exactly the same. Therefore,
if we want to introduce an additional blank space between the words, we
need to use some ConTeXt commands that do this. Normally it will work
with “`\␣`”, meaning a `\`
character followed by a blank space. But there are other procedures that
will be looked at in \in{chapter}[sec:horizontal space1] regarding
horizontal space.

The absorption of consecutive blank spaces allows us to write the source
file by visually highlighting parts we would like to highlight, simply by
increasing or decreasing the indentation used, with the peace of mind of
knowing that it will not in any way affect the final document. Thus, in the
following example

```text
The music group from Madrid at the end of the seventies {\em La Romántica
  Banda Local} wrote songs of an eclectic style that were very difficult to
categorise. In their son “El Egipcio”, for example, they said: 
\quotation{{\em Esto es una farsa más que una comedia, página muy seria
  de la histeria musical; sueños de princesa, vicios de gitano pueden en
  su mano acariciar la verdad}}, mixing word, phrases simply because they
have an internal rhythm (comedia-histeria-seria, gitano-mano).
```

you can see how some lines are slightly indented to the right. These are
lines that are part of the bits that will appear in italics. Having these
indented helps (the author) to see where the italics end.

!!! note ""
    
    Some might think, what a mess! Do I have to bother with indenting lines?
    The truth is that this special indenting is done automatically by my text
    editor (GNU Emacs) when it is editing a ConTeXt source file. It's that
    kind of small help that makes you choose to work with a certain text
    editor and not another one.

The rule that blank spaces are absorbed applies exclusively to consecutive
blank spaces in the source file. Therefore, if an empty group
(`{}`), is placed in the source file between two blank spaces,
although the empty group will not produce anything in the final file, its
presence will ensure that the two blanks are not consecutive. For example,
if we write “`Tweedledum {} and Tweedledee`”, we will get<!--tex(Tweedledum {} and Tweedledee)tex-->![img](../../img/spinner.png), where, if you look
closely enough, you will see two consecutive spaces between the first two
words.

The same happens with the reserved `\lettertilde` character, although
its effect is to generate a blank space even though it really isn't one: a
blank space followed by a \lettertilde\ will not absorb the latter, and a
blank space after \lettertilde\ will not be absorbed either.

### Line breaks

In most text editors, when a line exceeds the maximum width, a line break
is automatically inserted. We can also expressly insert a line break by
pressing the “Enter” or “Return” key.

ConTeXt applies the following rules to line breaks:

- A single line break is, to all intents and purposes, equal to a blank
space. Therefore, if immediately before or after the line break there is
any blank space or tab, these will be absorbed by the line break or the
first blank space, and in the final document a simple blank space will be
inserted.

- Two or more consecutive line breaks create a paragraph break. For
this, two line breaks are considered to be consecutive if there is nothing
but blank spaces or tabs between the first and second line break (because
these are absorbed by the first line break); which, in short, means that
one or more consecutive lines that are absolutely blank in the source file
(without any character in them, or only with blank spaces or tabs) become a
paragraph break.

Note that I said “two or more consecutive line breaks” and then
“one or more blank consecutive lines”, meaning that if we want to
increase the separation between paragraphs, we do not do so simply by
inserting another line break. For this we need to use the command that
increases vertical space. If we only want one extra line of separation, we
can use the `\blank` command. But there are other
procedures for increasing vertical space. I refer to
\in{section}[sec:verticalspace].

!!! note ""
    
    On some occasions, when a line break becomes white space, we can end up
    with some undesirable and unexpected white space. Especially when we are
    writing macros, where it is easy for a blank space to “sneak
    in” without us realising it. To avoid this we can use the reserved
    character `\%` which, as we know, causes the line where it appears
    not to be processed, which implies that the break at the end of the line
    will also not be processed. So, for example, the command

        \define[3]\Test{
        *#1*
        {\bf #2}
        #3
        }
    
    that writes its first argument in italics, the second in bold and the third
    in small caps, would insert a blank space between each of these arguments,
    while
    
        \define[3]\Test{%
        *#1*%
        {\bf #2}%
        #3%
        }

    will not insert any blank space between them, since the reserved character
    % prevents line breaks from being processed and just become a blank space.
    
### Rules/dashes

Dashes are a good example of the difference between a computer keyboard and
printed text. On a normal keyboard, there is usually only one character for
the dash (or rule, in typographic terms) which we call the hyphen or
(`-`); but a printed text uses up to four different lengths for
rules:

- Short rules (hyphens), like those used to separate syllables in
hyphenation at the end of a line (<!--tex(-)tex-->![img](../../img/spinner.png)).

- Medium-sized rules (en dashes or en rules), slightly longer than the
previous ones (<!--tex(--)tex-->![img](../../img/spinner.png)). They have a number of uses including, for some European
languages (less so in English) the beginning of a line of dialogue, or to
separate the lesser from the greater digits in a range in dates or pages;
“pp. 12&ndash;3”.

- Long rules (em dashes or em rules) (<!--tex(---)tex-->![img](../../img/spinner.png)), used as parentheses to
include one sentence within another.

- Minus sign (<!--tex($-$)tex-->![img](../../img/spinner.png)) to represent subtraction or a negative number.

Today, all the above and others besides are available in UTF-8 encoding.
But since they can't all be generated by a single key on the keyboard, they
are not so easy to produce in a source file. Fortunately, TeX saw the
need to include more rules/dashes in our final document than could be
produced by the keyboard, and designed a simple procedure to do so.
ConTeXt has complemented this procedure by also adding commands that
generate these various kinds of rules. We can use two approaches for
generating the four kinds of rule: either the ordinary ConTeXt way with
a command, or directly from the keyboard. These procedures are shown in
table 4.2:


| Type of rule | Appearance | Written directly | Command |
|--------------|:----------:|:----------------:|---------|
| Hyphen | <!--tex(-)tex-->![img](../../img/spinner.png) | `-` | `\hyphen` |
| En rule | <!--tex(--)tex-->![img](../../img/spinner.png) | `--` | `\endash` |
| Em rule | <!--tex(---)tex-->![img](../../img/spinner.png) | `---` | `\emdash` |
| Minus sign | <!--tex($-$)tex-->![img](../../img/spinner.png) | `$-$` | `\minus` |

(Table 4.2: Rules/dashes in ConTeXt)

The command names `\hyphen` and `\minus` are the ones normally used
in English. While many in the printing industry call them ‘rules’,
TeX's terms, namely `\endash` and `\emdash` are also common in
typesetting terminology. The “*en*” and “*em*”
are the names of units of measure used in typography. An “en”
represents the width of an ‘n’ while an “em” is the width
of an ‘m’ in the font being used.

## Simple and multifile projects

In ConTeXt we can use just one source file that includes absolutely all
the contents of our final document as well as all the details relating to
it, in which case we are talking about “simple projects”, or, by
contrast, we could use a number of source files which share the contents of
our final document, and in this case we are talking about
“multifile projects”.

The scenarios where it is typical to work with more than one source file
are as follows:

- If we are writing a document in which a number of authors have
collaborated, each with their own part different from the others; for
example, if we are writing a festschrift with contributions from different
authors, or the number of a journal, etc.

- If we are writing a lengthy document where each part (chapter) has
relative autonomy, so that the final arrangement of these allows for
several possibilities and will be decided at the end. This occurs with
relative frequency for many academic texts (manuals, introductions and the
like) where the order of chapters may vary.

- If we are writing a number of related documents that share some style
characteristics.

- If, put simply, the document we are working on is large, such that
the computer slows down either when editing or compiling it; in this case,
splitting the material across several source files will considerably speed
up the compilation for each.

- Also, if we have written a number of macros that we want to apply in
some (or all) our documents, or if we have generated a template that
controls or styles our documents and we want to apply these to them, etc.

## Structure of the source file in simple projects

In simple projects developed in a single source file, the structure is very
simple and revolves around the `text` environment that must
essentially appear in the same file. We differentiate between the following
parts of this file:

- **The document preamble**: everything from the first line in the
file up to the beginning of the `text` environment
(`\starttext`).

- **The body of the document**: this is the contents of the
`text` environment; or in other words, everything between
`\starttext` and `\stoptext`.

```tex
% First line of the document

% Preamble area:
% Containing the global configuration
% commands for the document

\starttext % The body of the document begins here

…
… % Document contents
…

\stoptext % End of the document
```

In \in{figure}[img:ProyectoSimple] we see a very simple source file.
Absolutely everything before the command `\starttext` (which in the
image is on line 5, counting only those with some text), constitutes the
preamble; everything between `\starttext` and `\stoptext` constitutes
the body of the document. Anything after stoptext will be ignored.

**The preamble** is used to include commands that are to affect the
document as a whole, the ones that determine its overall configuration. It
is not essential to write any command in the preamble. If there is none,
ConTeXt will adopt a default configuration which is not very developed
but could do for many documents. In a well-planned document, the preamble
will contain all the commands affecting the document as a whole, like
macros and customised commands to be used in the source file. In a typical
preamble, this could include the following:

- An indication of the document's main language (See
  \in{section}[sec:langdoc]).

- An indication of paper size
  (\in{section}[sec:papersize]) and page layout
  (\in{section}[sec:pagelayout]).

- Features of the documents main font
  (\in{section}[sec:mainfont]).

- Customisation of the section commands to be used
  (\in{section}[sec:setuphead]) and, if needs be, definition of
  new section commands (\in{section}[sec:definehead]).

- Layout of headers and footers
  (\in{section}[sec:headerfooter]).

- Settings for our own macros
  (\in{section}[sec:definingcommands]).

- Etc.

The preamble is intended for the overall configuration of the document;
therefore nothing that is to do with the *contents* of the document, or
processable text, should be there. In theory, any processable text included
in the preamble will be ignored, although sometimes, if it is there, it
will cause a compiling error.

**The body of the document**, framed between the `\starttext` and
`\stoptext` commands includes the actual contents, meaning processable
text, along with ConTeXt commands that should not affect the whole
document.


## Multifile management in TeX style

In order to work with more than one source file, TeX included the
primitive called `\input`, which also works in ConTeXt, although the
latter includes two specific commands that to some extent perfect the way
`\input` functions.

### The `\input` command

The `\input` command inserts the contents of the file it indicates. Its
format is:

`\input FileName`

where *FileName* is the name of the file to insert. Note that it is not
necessary for the file name to be enclosed between curly brackets, even
though it will not throw an error if this is done. However, it should never
be put between square brackets. If the file extension is
“`.tex`”, it can be omitted.

When ConTeXt is compiling a document and finds an `\input` command, it
looks for the file indicated and continues compiling as if this file were
part of the file that called it. When it finishes compiling it, it returns
to the original file and continues from where it left off; the practical
result is, therefore, that the contents of the file called by means of
`\input` are inserted at the point where that is called. The file called
with `\input` must have a valid name in our operating system and no
blank spaces within the name. ConTeXt will look for it in the working
directory, and if it doesn't find it there, it will look for it in
directories included in the variable of the TEXROOT environment. If the
file is not ultimately found, it will produce a compilation error.

The most common use of the `\input` command is as follows: a file is
written, let's call it `principal.tex`, and this will be used as a
container for calling, through the `\input` command, the various files
that make up our project. This is shown in the following example:

```tex
% General configuration commands:

  \input MyConfiguration

\starttext

  \input PageTitle
  \input Preface
  \input Chap1
  \input Chap2
  \input Chap3

  …

\stoptext
```

Note how, for the general configuration of the document, we have called the
file “MyConfiguration.tex” which we assume contains the global
commands we want to apply. Then, between the commands `\starttext` and
`\stoptext` we call the several files that contain the contents of the
various parts of our document. If, at a given moment, to speed up the
compiling process, we want to leave out compiling some files, all we need
to do is put a comment mark at the beginning of the line calling that or
those files. For example, if we are writing the third chapter and we want
to compile it simply to check that there are no errors in it, we don't need
to compile the rest and therefore can write:

```tex
% General configuration commands:

  \input MyConfiguration

\starttext

  % \input PageTitle
  % \input Preface
  % \input Chap1
  % \input Chap2

  \input Chap3

  …

\stoptext
```

and only Chapter 3 will be compiled. Note how, on the other hand, changing
the order of chapters is as simple as changing the order of the lines
calling them.

!!! note ""
    
    When we exclude a file in a multifile project from being compiled, we
    gain in processing speed, but as a result, all the references that the
    part being compiled makes to other parts not as yet compiled will no
    longer work. See \in{section}[sec:references].

It is important to be clear that when we are working with `\input`, only
the main file, the one that calls all the others, must include the
`\starttext` and `\stoptext` commands, because if the other files
include them, there will be an error. This, on the other hand, means that
we cannot directly compile the different files that make up the project,
but must necessarily compile them from the main file, which is the one that
houses the basic structure of the document.

### `\ReadFile` and `\readfile`

As we have just seen, if ConTeXt does not find the file called with
`\input`, it will generate an error. For the situation where we want to
insert a file only if it exists, but allowing for the possibility that it
might not, ConTeXt offers a variation of the `\input` command. This is

`\ReadFile{FileName}`

This command is similar to `\input` in every respect, with the only
exception that if the file to be inserted is not found, it will continue
compiling without generating any kind of error. It also differs from
`\input` in its syntax, since we know that with `\input` it is not
necessary to put the file name of the file to be inserted between curly
brackets. But with `\ReadFile` it is necessary. If we don't use curly
brackets, ConTeXt will think that the name of the file to be sought is
the same as the first character that follows the `\ReadFile` command,
followed by the extension `.tex`. So, for example, if we write

`\ReadFile MyFile`

ConTeXt will understand that the file to be read is called
“`M.tex`”, since the character immediately after the command
`\ReadFile` (excluding blank spaces that are, as we know, ignored at the
end of a command name) is an ‘M’. Since ConTeXt will not normally
find a file called “`M.tex`”, and `\ReadFile` does not
generate an error if it doesn't find the file, ConTeXt will continue
compiling after the ‘M’ in “`MyFile`”, and will insert
the text “`yFile`”.

A more refined version of `\ReadFile` is `\readfile` whose format is

`\readfile{FileName}{TextIfExists}{TextIfNotExists}`

The first argument is similar to `\ReadFile`: the name of a file
enclosed between curly brackets. The second argument includes the text to
be written if the file exists, before inserting the contents of the file.
The third argument includes the text to be written if the file in question
is not found. This means that depending on whether or not the file entered
as the first argument is found, the second argument (if the file exists) or
the third (if the file does not exist) will be executed.


## ConTeXt projects as such

The third mechanism that ConTeXt offers for multifile projects is more
complex and complete: it starts by distinguishing between project files,
product files, component files and environment files. To understand the
relations and functioning of each of these types of file, I think it is
best to explain them each individually:

### *Environment* files

An environment file is a file that stores the macros and configurations of
a specific style that is intended to be applied to several documents,
whether they are completely independent documents or parts of a complex
document. The environment file, therefore, can include everything we would
normally write before `\starttext`; that is: the general configuration
of the document.

!!! note ""
    
    I have retained the term “environment files” for these kinds of
    files, in order not to depart from the ConTeXt official terminology, even
    though I believe that a better term would probably be “format
    files” or “global configuration files”.
    


Like all ConTeXt source files, the environment files are text files, and
assume that the extension will be “`.tex`”, although if we
want we can change it, perhaps to “`.env`”. Usually this is
not done in ConTeXt however. Most often the environment file is
identified by starting or ending the name with ‘env’. For
example:“`MyMacros_env.tex`” or
“`env_MyMacros.tex`”. The inside of such an environment file
would look something like the following:

```tex
\startenvironment MyEnvironment

  \mainlanguage[en]

  \setupbodyfont
    [modern]

  \setupwhitespace
    [big]

  …

\stopenvironment
```

Or in other words, definitions and configuration commands come within
`\startenvironment` and `\stopenvironment`. Immediately following
`\startenvironment` we write the name by which we want to identify the
environment in question, and then include all the commands we would like
our environment to be made up of.

!!! note ""
    
    With regard to the name of the environment, according to my tests, the name
    we add immediately after `\startenvironment` is merely indicative, and
    if we were to give it no name, then nothing (bad) happens.

Environment files were intended to work with components and products
(explained in the next section). This is why one or more environments can
be called from a component or a product using the `\environment`
command. But this command also works if it is used in the configuration
area (preamble) of any ConTeXt source file, even if it is not a source
file intended to be compiled in parts.

The `\environment` command can be called using either of the two
following formats:

`\environment File`

`\environment[File]`

In either case, the effect of this command will be to load the contents of
the file taken as an argument. If that file is not found, it will continue
compiling in a normal way without generating any error. If the file
extension is “`.tex`”, it can be omitted.

### Components and products

If we think of a book where each chapter is in a different source file,
then we would say that the chapters are *components* and the book is
the *product*. This means that the *component* is an autonomous
part of a *product*, able to have its own style and to be compiled
independently. Each component will have a different file, and, in addition,
there will be a product file that brings all the components together.

A typical component file would be as follows

```tex
\environment MyEnvironment
\environment MyMacros

\startcomponent Chapter1

  \startchapter[title={Chapter 1}]

  …

\stopcomponent
```

And a product file would look like the following:

```tex
\environment MyEnvironment
\environment MyMacros

\startproduct MyBook

  \component Chapter1
  \component Chapter2
  \component Chapter3

  …

\stopproduct
```

Note that the actual contents of our document will be distributed among the
various ‘component’ files and the product file is limited to
establishing the order of the components. On the other hand, the
(individual) components and the products can be compiled directly.
Compiling a product will generate a PDF file containing all the components
of that product. If, on the other hand, one of the components is compiled
individually, it will generate a pdf file containing only the compiled
component.

Within a component file, and before the `\startcomponent` command, we
can call one or more environment files with `\environment EnvironmentName`. We can do the same in the product file before
`\startproduct`. Several environment files can be loaded simultaneously.
We can, for example, have our favourite collection of macros and the
different styles we apply to our documents all in different files. Please
note, however, that when we use two or more environments, these are loaded
in the order in which they are called, so that if the same configuration
command has been included in more than one environment, and it has
different values, the values of the last loaded environment will apply. On
the other hand, environment files are loaded only once, so in the previous
examples in which the environment is called from the product file and from
specific component files, if we compile the product, that is the time when
the environments are loaded, and in the order indicated there; when an
environment is called from any of the components, ConTeXt will check if
that environment is already loaded, in which case it will do nothing.


The name of the component that is called from a product must be the name of the file that contains the component in question, although, if the extension of this file is “`.tex`”, it can be omitted.

### Projects as such

The distinction between products and components is sufficient in most cases. Just the same, ConTeXt has an even higher level where we can group a number of products: this is the *project*.

A typical project file would be more or less as follows

```tex
\startproject MyCollection

  \environment MyEnvironment
  \environment MyMacros

  \product Book01
  \product Book02
  \product Book03

  …

\stopproject
```

A scenario where we would need a project would be, for example, where we
need to edit a collection of books, all with the same format
specifications; or if we were editing a journal: the collection of books,
or the journal as such, would be the project; each book or each journal
issue would be a product; and each chapter of a book or each article in a
journal issue would be a component.

Projects, on the other hand, are not intended to be compiled directly.
Consider that by definition each product belonging to the project (each
book in the collection, or each journal issue) should be compiled
separately and generate its own PDF. Therefore the `\product` command
included in it to indicate what products belong to the project, actually
does nothing: it is simply a reminder for the author.

Clearly, some could ask why we have projects if they can't be compiled: the
answer is that the project file links certain environments to the project.
This is why, if we include the `\project ProjectName` command in a component or product file, ConTeXt will read
the project file and automatically load the environments linked to it. This
is why the `\environment` command in projects has to come after
`\startproject`; however, in products and components, `\environment`
has to come *before* `\startproduct` or `\startcomponent`

Just like with the `\environment` and `\component` commands, the
`\project` command allows us to indicate the project name either inside
square brackets or not use square brackets at all. This means that
`\project FileName` and `\Project[FileName]` are equivalent commands.

#### Summary of the different ways of loading an environment

It follows from the above that an environment can be loaded by any of the
following procedures:

- By inserting the `\environment EnvironmentName` command before
`\starttext` or `\startcomponent`. This will load the environment for
compiling the file in question only.

- By inserting the `\environment EnvironmentName` command in a
product file before `\startproduct`. This will load the environment when
the product is compiled, but not if its components are compiled
individually.

- By inserting the `\project` command in a product or environment:
this will load all environments linked to the project (in the project
file).

### Common aspects of environments, components, products and projects

- **Names of environments, components, products and projects**:
We have already seen that, for all these elements, after the `\start`
command that initiates a particular environment, component, product or
project, its name is entered directly. This name, as a rule, must coincide
with the name of the file containing the environment, component or product
because, for example, when ConTeXt is compiling a product and, according
to the product file must load an environment or component, we have no way
of knowing which file that environment or component is unless the file has
the same name as the element to be loaded.

Otherwise, according to my tests, the name written after `\startproduct`
or `\startenvironment` in the product and environment files is merely
indicative. If it is omitted, or does not match the name of the file,
nothing bad happens. However, in the case of components, it is important
that the name of the component matches the name of the file that contains
it.

- **Structure of project directories**:
We know that by default ConTeXt looks for files in the working directory
and in the path indicated by the TEXROOT variable. However, when we use the
`\project`, `\product`, `\component` or `\environment` commands
it is assumed that the project has a directory structure in which common
elements are found in the parent directory, and the specific ones in some
child directory. So, if the file indicated in the working directory is not
found, it will be searched for in its parent directory, and if it is not
found there either, in that directory's parents directory, and so on.
