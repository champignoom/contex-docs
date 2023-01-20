# Commands and other fundamental concepts of ConTeXt

We have already seen that in the source file, as well as in the actual
contents of our future formatted document, we find the instructions
needed to explain to ConTeXt how we want our manuscript to be
transformed. These instructions can be called “commands”,
“macros” or “control sequences”.

!!! note ""
    
      From the point of view of ConTeXt's internal functioning (actually,
      TeX's functioning), there is a difference between *primitives*
      and *macros*. A primitive is a simple instruction that cannot be
      broken down into other simpler instructions. A macro is an instruction
      that can be broken down into other simpler instructions which, in
      turn, can also perhaps be broken down into still others, and so on and
      so on. Most of ConTeXt's instructions are, in fact, macros. From the
      programmer's perspective, the difference between macros and primitives
      is important. But from the user's perspective the issue is not so
      important: in both cases what we have are instructions that are
      carried out without our need to worry about how they function at a low
      level. Therefore, ConTeXt documentation commonly talks about a *command* when it takes the user's perspective, and a *macro* when
      it takes the programmer's perspective. Since we are only taking the
      user's perspective in this introduction, I will use either term,
      regarding them as synonymous.
    
      *Commands* are orders given to ConTeXt to do something; we *control* the program's performance through them. Thus Knuth, the
      father of TeX, uses the term *control sequences* to refer to both
      primitives and macros, and I think this is the most accurate term of
      them all. I will use it when I believe it is important to distinguish
      between *control symbols* and *control words*.


ConTeXt's instructions are basically of two kinds: reserved characters,
and commands properly so called.

## ConTeXt's reserved characters

When ConTeXt is reading the source file made up only of text
characters, since it is a text file it needs to somehow distinguish what
is actual text to be formatted, and what are the instructions it has to
carry out. ConTeXt's reserved characters are what enable it to make
this distinction. In principle, ConTeXt will assume that every
character in the source file is text to be processed, unless it is one
of the 11 reserved characters which are to be treated as an *instruction*.

Only 11 instructions? No. There are only 11 reserved characters; but
since one of them, the“`\`” character, has the
function of converting the character or characters immediately following
it into an instruction, then really the potential number of commands is
unlimited. ConTeXt has around 3000 commands (adding up the commands
exclusive to Mark&nbsp;II, Mark&nbsp;IV and the ones common to both versions).

The reserved characters are as follows: 

```
% { } # ~ | $ _ @ &
```

ConTeXt interprets them in the following way:

- `\`:
This character is the most important of all for us: it indicates that
what comes immediately after must not be interpreted as text but as an
instruction. It is called the “Escape character” or
“Escape sequence” (even though it has nothing to do with the
“Esc” key found on most keyboards).[^1]

- `%`:
Tells ConTeXt that what follows up to the end of the line is a comment
that must not be processed or included in the final formatted file.
Introducing comments into the source file is extremely useful. A comment
can help explain why something has been done in a certain way, and this
is very helpful in completed source files, in view of later revision
when sometimes we cannot remember why we did what we did; or it can also
help as a reminder to ourselves about something we might need to revise.
It can even be used to help locate the cause of a certain error in the
source file, since by placing a comment mark at the beginning of a line,
we exclude that line from being compiled, and can see if it was that
line that was causing the error; it can also be used to store two
different versions of the same macro, and that way get different results
after compiling; or to prevent a snippet from being compiled that we are
not sure about but without deleting it from the source file in case we
want to return to it later … etc.  Once we have opened up the
possibility that our source file contains text that nobody but ourselves
should see, our uses of this character are only limited by our own
imagination. I admit that this is one of the utilities I miss most when
the only remedy for writing a text is a word processor.

- `{`:
This character opens a group. Groups are blocks of text affected by
certain features. We will talk about them in [section 3.8.1](#groups).

- `}`:
This character closes a group previously opened with `\{`.

- `#`:
This character is used for defining macros. It refers to the macro's
arguments. See [section 3.7.1](#general-mechanism-for-defining-new-commands) in this chapter.

- `~`:
Introduces a white space into the document to prevent a line break,
meaning that two words separated by the `~` character will always
remain on the same line. We will speak about this instruction and where
it should be used in \in{section}[sec:lettertilde].

- `|`:
This character is used to indicate that two words joined by a separating
element constitute a compound word that can be divided by syllables into
the first component, but not into the second component. See
\in{section}[sec:compound words].

- `$`:
This character is a switch for the maths mode. It enables that mode if
it wasn't enabled, or disables it if it was. When in maths mode,
ConTeXt applies some fonts and rules that differ from normal ones,
aimed at optimising the writing of mathematical formulas. Even though
writing mathematics is a very important use of ConTeXt, I will not
develop this in this introduction. Being a literary man, I don't feel up
to it!

- `_`:
This character is used in maths mode to indicate that what follows is a
subscript. So, for example, to get <!--tex($x_1$)tex-->![img](../../img/spinner.png), we need to write `$x_1$`.

- `@`:
This character is used in maths mode to indicate that what follows is a
superscript. So for example, to get <!--tex($(x+i)^{n^3}$)tex-->![img](../../img/spinner.png) we need to write
`$(x+i)^{n^3}$`.

- `&`:
It says in the ConTeXt documentation that this is a reserved
character, but it does not say why. In Plain TeX this character
basically has two uses: it is used to align columns in basic table
environments, and, in a maths context, so that what follows is to be
treated as normal text. In the introductory manual “ConTeXt
Mark&nbsp;IV, an Excursion”, although it does not say what it is for, there
are examples of its use in mathematical formulas, though not of the kind
it had in Plain TeX, but to align columns within complex
functions. As I am a literary person, I do not feel I can carry out
further tests to see what the precise use of this reserved character is
for.

It can be assumed that in selecting which characters would be reserved
ones, they would be characters available on most keyboards but ones not
usually used in written scripts. However, although not so common, there
is always the possibility that some of them will figure in our
documents, like for example, when we want to write that something costs
a 100 dollars ($100), or that in Spain, the percentage of drivers over
65 years of age was 16% in 2018. In these cases we must not write the
reserved character directly but use a *command* that will output the
reserved character properly in the final document. The command for each
of the reserved characters is found in table 3.1.


| Reserved character | Command that generates it |
|:------------------:|:-------------------------:|
| \\                 | `\backslash`              |
| %                  | `\%`                      |
| {                  | `\{`                      |
| }                  | `\}`                      |
| #                  | `\#`                      |
| ~                  | `\lettertilde`            |
| \|                 | `\|`                      |
| $                  | `\$`                      |
| _                  | `\_`                      |
| ^                  | `\letterhat`              |
| &                  | `\&`                      |

(Table 3.1: Writing reserved characters)

Another way of getting the reserved characters is with the `\type`
command. This command sends what it takes as an argument to the final
document without processing it in any way, and therefore without
interpreting it. In the final document, the text received from
`\type` will be shown in the monospaced font typical of computer
terminals and typewriters.

!!! note ""
    
      Normally we would enclose the text that `\type` has to show between
      curly brackets. However, when this text itself includes opening or
      closing curly brackets, instead of them we must enclose the text
      between two equal characters that are not part of the text that
      constitutes the argument of `\type`. For example: `\type*{*`,
      or `\type+}+`.

If, by mistake, we use one of the reserved characters directly, other
than for the purpose which it is intended, because we have forgotten
that it is a reserved character and cannot be used like a normal one,
then three things can happen:

  - Most commonly, an error is generated when compiling.

  - We get an unexpected result. This happens especially with
  `~` and `%`; in the former case, instead of
  the `~` we expected in the final document, a white
  space will be inserted; and in the latter case, everything on the same
  line will stop being processed, starting from `%`. Improper use
  of the “`\`” too can produce an unexpected
  result if it or the characters immediately after it make up a command
  that ConTeXt knows about. However, more commonly when we incorrectly
  use the “`\`” we will have a compiling error.

  - No problem occurs: This happens with three of the reserved
  characters used mainly in mathematics (`_ ^ &`): if used outside
  of this environment they are treated as normal characters.

!!! note ""
    
    Point 3 is my conclusion. The truth is that I not found anywhere in
    the  ConTeXt documentation that tells us where these reserved
    characters can be used directly; in my tests, however,
    I have not seen any error when this is done; unlike, for example, in
    LaTeX.

## Commands themselves

Commands themselves always begin with the “`\`”
character. Depending on what comes immediately after the escape
sequence, a distinction is made between:

  - **Control symbols.** A control symbol begins with the escape
  sequence (“`\`”) and consists exclusively of a
  character other than a letter, as for example “`\,`”,
  “`\1`”, “`\'`” or “`\%`”. Any
  character or symbol that is not a letter in the strict sense of the
  term can be a control symbol, including numbers, punctuation marks,
  symbols and even a blank space. In this document, to represent a blank
  space (white space) when its presence needs to be highlighted, the
  symbol I use is ␣. In fact,
  “`\␣`” (a backslash followed by a blank
  space) is a commonly used control symbol, as we will soon be able to
  see.

!!! note ""
    <span id="note-invisible-space"></a>
    A blank or white space is an “invisible” character, which
    is a problem in a document like this, where at times we need to
    clearly specify what needs to be written in a source file. Knuth was already aware of the problem, and in his “The
    TeX Book” he began the custom of representing significant blank
    spaces with the “␣” symbol. So, for
    example, if we wanted to show that two words in the source file need
    to be separated by two blank spaces, then we would write
    “word1␣␣word2”.

  - **Control words.** If the character immediately following the
  backslash is a letter properly speaking, the command will be a *Control word*. this group of commands is the most numerous and its
  feature is that the command name can only consist of letters; numbers,
  punctuation marks or any other kind of symbol are not allowed. Only
  lower case or upper case letters. Bear in mind, on the other hand,
  that ConTeXt makes a distinction between lower case and upper case,
  meaning that the `\mycommand` and `\MyCommand` commands are
  different. But `\MyCommand1` and `\MyCommand2` would be
  considered the same, since not being letters, ‘1’ and ‘2’
  are not part of the command names.

!!! note ""
    
    The ConTeXt reference manual contains no rules on command names,
    nor do the rest of the “manuals” included with
    ConTeXt Standalone. What I stated in the previous paragraph is my
    conclusion based on what happens in TeX (where, besides,
    characters like accented vowels that do not appear in the English
    alphabet are not thought of as “letters”). This rule makes
    it possible to offer a good explanation for the absorption of white
    space after a command name.

When ConTeXt is reading a source file and finds an escape character
(“`\`”), it knows that a command will follow. It
then reads the first character following the escape sequence. If it is
not a letter, it means the command is a control symbol and consists only
of this first symbol. But on the other hand, if the first character
after the escape sequence is a letter, then ConTeXt will continue to
read each character until it finds the first non-letter, and then it
knows that the command name has finished. This is why command names that
are control words cannot contain characters that are not letters.

When the “non-letter” at the end of the command name is a
blank space, it is assumed that the blank space is not part of the text
to be processed, but was inserted exclusively to indicate where the
command name ended, so ConTeXt gets rid of this space. This produces
an effect that surprises ConTeXt beginners, because when the effect of
the command in question implies writing something in the final document,
the written output of the command is connected to the next word. For
example, the following two sentences in the source file

```tex
Knowing \TeX helps with learning \ConTeXt.
Knowing \TeX, although not essential, helps with learning \ConTeXt
```

produce the following results respectively:[^2]

<!--tex(
Knowing \TeX helps with learning \ConTeXt.\\
Knowing \TeX, although not essential, helps with learning \ConTeXt.
)tex-->![img](../../img/spinner.png)

Note how, in the first case, the word “TeX” is connected to
the word that follows but not in the second case. This is because, in
the first case in the source file, the first “non-letter”
after the command name `\TeX` was a blank space, suppressed because
ConTeXt assumed it was there only to indicate the end of a command
name, while in the second instance there was a comma, and since this is
not a blank space, it has not been suppressed.

On the other hand, this problem is not solved simply by adding an extra
blank space, and writing, for example,

`Knowing \TeX␣␣helps with learning \ConTeXt`[^3].

will not solve the problem, because a ConTeXt rule (that we will see
in \in{section}[sec:spaces]) is that a blank space absorbs all the
blanks and tabs that follow it. Therefore, when we have this problem
(which fortunately does not happen too often) we must make sure that the
first “non-letter” after the command name is not a blank
space. There are two candidates for this:

  - The reserved characters “`{}`”. The reserved character
  “`{`”, as I have said, opens a group, and “`}`” closes a
  group, therefore the sequence “`{}`” introduces an empty group.
  An empty group has no effect on the final document, but it helps
  ConTeXt to know that the command name prior to it has finished.  Or
  we could also create a group around the command in question, for
  example by writing “`{\TeX}`”. In either case, the
  result will be that the first “non-letter” after `\TeX`
  is not a blank space.

  - The control symbol “`\␣`” (a
  backslash followed by a blank space, see [the note](#note-invisible-space).
  The effect of this control symbol is
  to insert a blank space in the final document. To understand
  ConTeXt's logic properly, it may be worth taking some time to see
  what happens when ConTeXt encounters a control word (for example
  `\TeX`) followed by a control symbol (e.g.
  “`\␣`”):

    - ConTeXt encounters the \\ character followed by a
    ‘T’ and knowing that this comes before a control word, it
    keeps reading characters until it comes to a “non-letter”,
    something that happens when it comes to the \\ character
    introducing the next control symbol.

    - Once it knows that the command name is `\TeX`, it runs the
    command and prints TeX in the final document. It then returns to
    the point where it stopped reading to check the character
    immediately after the second backslash.

    - It checks that it is a blank space, meaning a
    “non-letter” which means that the control sequence is
    exactly that, so it can run it. It does so, and inserts a blank
    space.

    - Finally, it returns once more to the point where it stopped
    reading (the blank space that was the control symbol) and continues
    to process the source file from there onwards.

I have explained this mechanism in some detail, as the elimination of
blank spaces often surprises newcomers. However, it should be noted that
the problem is relatively minor, as the control words do not usually
print directly to the final document, but affect the format and
appearance. By contrast, it is quite common for control symbols to print
something to the final document.

!!! note ""
    
      There is a third procedure to avoid the problem of blank space, which
      consists in defining (TeX style) a similar command and including a
      “non-letter” at the end of the command name. For example,
      the following sequence:
    
      `\def\txt-{TeX}`
    
    would create a command called `\txt`, that would do exactly the same
    as the command `\TeX` and only function correctly if called with a
    hyphen after it `\txt-`. This hyphen is not technically part of the
    command name, but it will not work unless the name is followed by a
    hyphen. Why this is so has to do with the mechanism for defining TeX
    macros, and it is too complex to explain here. But it works: once this
    command is defined, every time we use `\txt-`, ConTeXt substitutes
    it with `\TeX` by eliminating the hyphen, but using it internally to
    know that the command name is already finished, so a blank space
    immediately after it would not be deleted.
    
    This ‘trick’ will not work correctly with the `\define`
    command, which is a specifically ConTeXt command for defining macros.


## Scope of the commands

### Commands that do or do not require a scope to be indicated

Many of the ConTeXt commands, especially those that affect formatting
features of fonts (bold, italic, small caps, etc.), enable a certain
feature that remains enabled until another command is encountered that
disables it, or that enables another feature incompatible with it. For
example, the command `\bf` enables bold, and this will remain active
until it finds an *incompatible* command like, for example,
`\tf`, or `\it`.

These kinds of commands do not need to take any argument, as they are
not designed to apply only to certain text. It is as if they are limited
to *turning on* whatever function (bold, italic, sans serif, a
certain font size, etc.).

When these commands are executed within a *group* (see
[section 3.8.1](#groups)), they also lose their effectiveness when the
group they are executed in is closed. Therefore, often in order to make
these commands affect only a portion of text, what is done is to
generate a group containing that command and the text we want it to
affect. A group is created by enclosing it between curly brackets.
Therefore, the following text

<table markdown="1"><tr>
<td markdown="1">
`In {\it The \TeX Book}, {\sc Knuth} explained everything you need to know about \TeX.`
</td>
<td markdown="1">
<!--tex(In {\it The \TeX Book}, {\sc Knuth} explained everything you need to know about \TeX.)tex-->![img](../../img/spinner.png)
</td>
</tr></table>

creates two groups, one to determine the scope of the `\it` (italics)
command and the other to determine the scope of the `\sc` (small
caps) command.

By contrast with this kind of command, there are others that, because of
the effect they produce or for other reasons, require an express
indication of what text they are to be applied to. In these cases the
text to be affected by the command is enclosed within curly brackets
*immediately after the command*. As an example of this we could
mention `\framed`: this command draws a frame around the text it
takes as an argument, such that

`\framed{Tweedledum and Tweedledee}`

will produce

<!--tex(\framed{Tweedledum and Tweedledee})tex-->![img](../../img/spinner.png)

Note that although in the first group of commands (those that require an
argument) curly brackets are also sometimes used to determine the field
of action, this is not necessary for the command to work. The command is
designed to be applied from the point where it appears. So, when
determining its field of application by using brackets, the command is
placed *within these brackets*, unlike in the second group of
commands, where the brackets framing the text the command is to be
applied to, come *after* the command.

In the case of the `\framed` command, it is obvious that the effect
it produces requires an argument &mdash; the text to which it is to be
applied. In other cases, it depends on the programmer whether the
command is of one type or the other. So, for example, what the `\it`
and `\color` commands do is quite similar: they apply a feature
(format or colour) to the text. But the decision was made to program the
first one without an argument, and the second as a command with an
argument.

### Commands requiring an express indication of where they begin and end (environments)

There are certain commands that determine their scope by indicating
precisely the point at which they begin to be applied and the point
where they cease to do so. These commands, therefore, come in pairs: one
indicating when the command is to be enabled, and the other when this
action must cease. “start”, followed by the command name, is
used to indicate the beginning of the action, and “stop”, also
followed by the command name, to indicate the end. So for example, the
command `itemize` becomes `\startitemize` to indicate the
beginning of *itemization* and `\stopitemize` to indicate where
it ends.

There is no special name for these command pairings in the official
ConTeXt documentation. The reference manual and the introduction
simply call them “start … stop”. Sometimes they are called
*environments*, which is the name LaTeX gives to a similar kind of
construction, although this has the disadvantage that in ConTeXt the
term “environment” is used for something else (a special kind
of file that we will see when talking about multifile projects in
\in{section}[sec-projects]). Even so, since the term environment is
clear, and the context will make it easy to distinguish if we are
talking about *environment commands* or *environment files*, I
will use this term.

Environments, therefore, consist of a command that opens or begins them,
and another that closes or ends them. If the source file contains a
command to open the environment that is not later closed, an error will
normally be generated.[^4] On the other hand, these kinds of errors are harder to find,
as the error can occur a long way past where the opening command occurs.
Sometimes the `.log` file will show us the line where the
incorrectly closed environment begins; but at other times, the lack of
closure of the environment means that ConTeXt misinterprets a certain
passage and not in that faulty environment, meaning that the
`.log` file is not much help to us for finding where the problem
lies.

Environments can be nested, meaning another environment can be opened
within an existing environment, although in the case where there are
nested environments, an environment needs to be closed inside the
environment it was opened in. In other words, the order in which
environments are closed has to be consistent with the order in which
they were opened. I believe this should be clear from the following
example:

```
\startSomething
  …
  \startSomethingElse
    …
    \startAnotherSomethingElse
      …
    \stopAnotherSomethingElse
  \stopSomethingElse
\stopSomething
```

In the example you can see how the `AnotherSomethingElse`
environment has been opened inside the `SomethingElse` environment
and needs to be closed inside it as well. To do otherwise would generate
an error when compiling the file.

In general, commands designed as *environments* are ones that
implement some change intended to be applied to units of text no smaller
than the paragraph. For example, the `narrower` environment that
changes the margins only makes sense when applied at paragraph level; or
the `framedtext` environment that frames one or more paragraphs.
This latter environment may help us understand why some commands are
designed as environments and others as individual commands: if we wish
to frame one or more words, all on the same line, we would use the
command `\framed`, but if what we want framed is a whole paragraph
(or several paragraphs) then we would use the `framedtext`
environment.

On the other hand, text located within a particular environment normally
constitutes a *group* (see [section 3.8.1](#groups)), which means
that if an activation command is found inside an environment, of those
commands that apply to all the text that follows, this command will
apply only until the end of the environment in which it is found; and,
in fact ConTeXt has an unnamed *environment* beginning with the
`\start` command (no other text follows; just *start*. This is
why I call it an *unnamed environment*) and finishing with the
`\stop` command. I suspect that the only function this has is to
create a group.

!!! note ""
    
      I have not read anywhere in ConTeXt documentation that
      one of the effects of environments is to group their contents, but
      this is the result of my tests with a number of the predefined
      environments, though I must admit that my tests have not been too
      exhaustive. I have simply checked some environments chosen at random.
      My tests show, however, that such a statement, if true, would only be
      so for some predefined environments: those created with the
      `\definestartstop` command  (explained in the
      [section 3.7.2](#creating-new-environments)) do not create any group, unless when
      defining the new environment we include the commands needed to create
      the group (see [section 3.8.1](#groups)).
    
      It is also my assumption that the environment I have called the *unnamed* (`\start`) environment is only there to create a group: it
      does create a group, but whether or not it has some other use I do not
      know. This is one of the undocumented commands in the reference
      manual.


## Command operation options

### Commands that can work in several different ways

Many commands can work in more than one way. In such cases there is
always a predetermined way of working that can be altered by indicating
the parameters corresponding to the desired operation in brackets after
the command name.

We find a good example of what I have just said with the `\framed`
command mentioned in the previous section. This command draws a frame
around the text it takes as an argument. By default, the frame has the
height and width of the text it is applied to; but we can indicate a
different height and width. Thus we can see the difference between how
the default `\framed` functions:

<table markdown="1"><tr>
<td markdown="1">
`\framed{Tweedledum}`
</td>
<td markdown="1">
<!--tex(\framed{Tweedledum})tex-->![img](../../img/spinner.png)
</td>
</tr></table>

and how a customised version functions:

<table markdown="1"><tr>
<td markdown="1">
```
\framed
  [width=3cm, height=1cm]
  {Tweedledum}
```
</td>
<td markdown="1">
<!--tex(\framed
  [width=3cm, height=1cm]
  {Tweedledum}
)tex-->![img](../../img/spinner.png)
</td>
</tr></table>

In the second example, between square brackets we have indicated a
specific width and height for the frame that surrounds the text it takes
as an argument. Within the brackets, the different configuration options
are separated by a comma; blank spaces and even line breaks (as long as
they are not a double line break) between two or more options, are not
taken into consideration so that, for example, the next four versions of
the same command produce exactly the same result:

```
\framed[width=3cm,height=1cm]{Tweedledum}

\framed[width=3cm,    height=1cm]{Tweedledum}

\framed
  [width=3cm, height=1cm]
  {Tweedledum}

\framed
  [width=3cm,
    height=1cm]
  {Tweedledum}
```

It is obvious that the final version is the easiest to read: we can see
at first sight how many options there are and how they are used. In an
example like this with only two options, perhaps it might not seem so
important; but in cases where there is a long list of options, if each
of them has its own line in the source file it makes it easier to *understand* what the source file is asking ConTeXt to do, and also, if
necessary, to discover a potential error. Therefore, this last format
(or similar) for writing commands is the ‘preferred’ one for
users.

As for the syntax of configuration options, see further ahead in
([section 3.5](#summary-of-command-syntax-and-options-and-on-the-use-of-square-and-curly-brackets-when-calling-them)).

### Commands that configure how other commands work (`\setupSomething`)

We have already seen that commands that support various possibilities in
how they function always have a default way of working. If one of these
commands is called several times in our source file, and we would like
to alter the default for them all, rather than changing these options
each time the command is called, it is much more convenient and
efficient to change the default. To do this there is almost always a
command available whose name begins with `\setup`, followed by the
name of the command whose default options we wish to change.

The `\framed` command we have been using as an example in this
section continues to be a good example. So, if we are using a lot of
frames in our document, but they all need precise measurements, then it
would be best to reconfigure how `\framed` works, doing so with
`\setupframed`. Thus

```
\setupframed
  [
    width=3cm,
    height=1cm
  ]
```

will ensure that from then on, every time we call `\framed`, by
default it will then generate a frame 3 centimetres wide by 1 centimetre
high, without needing to indicate this expressly each time.

There are some 300 commands in ConTeXt that allow us to configure how
other commands function. Thus, we can configure the default functioning
of frames (`\framed`), lists (`itemize`), chapter titles
(`\chapter`), or section titles (`\section`), etc.

### Setting up customised versions of configurable commands (`\defineSomething`)

Continuing with the `\framed` example, it is obvious that if our
document uses several kinds of frames, each with different measurements,
the ideal would be that we could *predefine* different
configurations of `\framed`, and associate them with a particular
name so we could use one or other of them as needed. We can do this in
ConTeXt with the `\defineframed` command, whose syntax is:

`\defineframed[Name][Configuration]`

where *Name* is the name assigned to the particular kind of frame to
be configured; and *Configuration* is the particular configuration
associated with this name.

The effect of all this will be that the indicated configuration is
associated with the name we have established, which, to all intents and
purposes, will work as if it were a new command, and we can use this in
any context where we would have been able to use the original command
(`\framed`).

This possibility does not only exist for the concrete case of the
`\framed` command, but for many of the commands that have a
`\setup` possibility. The combination of `\defineSomething` +
`\setupSomething` is a mechanism that gives ConTeXt its extreme
power and flexibility. If we make a detailed examination of what the
`\defineSomething` command does, we see that:

  - First of all, it clones a particular command that supports a
  variety of configurations.

  - It associates this clone with the name of a new command.

  - Finally, it sets a predetermined configuration for the clone,
  different from how the original command was configured.



In the example we have given, we were configuring our special frame at
the same time as we were creating it. But we can also create it first
and configure it later, because, as I said, once the clone is created it
can be used where the original could have been used. So for example, if
we have created a frame called `MySpecialFrame`, we can configure
it with `\setupframed` indicating the actual frame we want to
configure. In this case the `\setup` command will take a new argument
with the name of the frame to be configured:

```
\defineframed[MySpecialFrame]

\setupframed
  [MySpecialFrame]
  [ … ]
```

## Summary of command syntax and options, and on the use of square and curly brackets when calling them

Summing up what we have seen so far, we see that in ConTeXt

  - Commands properly so called always begin with the
  “`\backslash`” character.

  - Some commands can take one or several arguments.

  - Arguments that tell the command *how* it must function or
  that affect how it works in some way, are introduced inside square
  brackets.

  - Arguments that tell the command what part of the text it must
  act on are introduced inside curly brackets.

!!! note ""
    
    When the command will only act on one letter, as is the case, for
    example with the `\buildtextcedilla` command (just to give an
    example &mdash; the ‘ç’ so often used in Catalan), the curly
    brackets around the argument can be omitted: the command will apply
    to the first character that is not a blank space. 

  - Some arguments can be optional, in which case we can omit them.
  But what we can never do is to change the order of the arguments the
  command is expecting.

Arguments introduced between square brackets can be of various kinds.
Mainly:

  - They can take only a single value which will almost always be
  one word or a phrase.

  - They can take various options, in which case they can:

    - Be represented by just one word that could be a symbolic name
    (one that ConTeXt knows the meaning of), a measure or dimension, a
    number, the name of another command, etc.

    - Consist of names of variables that must be given a value. In
    this case the official definition of the command (see
    [section 3.6](#the-official-list-of-context-commands)) always tells us what kind of value
    each of the options expects.

      - When the value the option expects is text, this can contain
      blank spaces and also commands. In these cases it is sometimes
      convenient to enclose the value of the option between curly
      brackets.

      - When the value an option expects is a command, normally we
      can indicate more than one command as the value of an option,
      although sometimes we need to enclose all the commands assigned to
      the option between curly brackets. We must also enclose the
      contents of the option between curly brackets if any of the
      commands included in it takes an option between square brackets.

  In both cases the different options that are to take the same argument
  will be separated by commas. White space and line breaks (other than
  doubles) between the different options are ignored. White space and
  line breaks between the different arguments to a command are also
  ignored.

  - Finally, it is never the case with ConTeXt that the same
  argument simultaneously takes options consisting of a word and options
  consisting of a variable that must be explicitly assigned a value. In
  other words, we can have options like

  `\command[Option1, Option2, …]`

  and others like

  `\command[Variable1=value, Variable2=value, …]`

  But we can never find a mixture of both:

  `\command[Option1, Variable1=value, …]`

## The official list of ConTeXt commands

Amongst the ConTeXt documentation, there is an especially important
document with a list of all the commands, indicating for each of them
how many arguments they expect and of what kind, as well as the
different options envisaged and their permitted value. This document is
called `setup-en.pdf`, and is generated automatically for each
new version of ConTeXt. It can be found in the directory called
`tex/texmf-context/doc/context/documents/general/qrcs`.

!!! note ""
    
    In fact, the `qrc` has seven versions of this document, one for
    each of the languages that has a ConTeXt interface: German, Czech,
    French, Dutch, English, Italian and Romanian. For each of these
    languages there are two documents in the directory: one called
    `setup-LangCode` (where LangCode is the two international
    language identification letter-code) and a second document called
    `setup-mapping-LangCode`. This second document contains a list
    of commands in alphabetical order and indicates the command *prototype*, but without further information on the likely values for
    each argument.

This document is fundamental for learning to use ConTeXt, because it is
there that we can find out if a certain command exists or not; this is
especially useful, bearing in mind the **command** (or **environment**) + setup**command** + define**command** combination.
For example, if I know that a blank line is introduced with the
`\blank` command, I can find out if there is a command called
`\setupblank` that lets me configure it, and another that allows me
to set up a customised configuration for blank lines,
(`\defineblank`).

!!! note ""
    
    `setup-en.pdf`, therefore, is fundamental for learning ConTeXt.
    But I would really prefer, first of all, for it to tell us if a
    command only works in Mark&nbsp;II or Mark&nbsp;IV, and especially, that if
    instead of only telling us about the number of type of arguments each
    command allows, it would tell us what these arguments are for. This
    would greatly reduce the shortcomings of the ConTeXt documentation.
    There are some commands that allow optional arguments that I don't
    even mention in this introduction because I don't know what they are
    for and, since they are optional, nor is there any need to mention
    them. This is extremely frustrating.

## Defining new commands

### General mechanism for defining new commands

We have just seen how, with `\defineSomething` we can clone a
pre-existing command and develop a new version of it from there, that
will function, to all intents and purposes, as a new command.

Along with that possibility, which is only available to some specific
commands (quite a few, certainly, but not all), ConTeXt has a general
mechanism for defining new commands that is extremely powerful though,
in some of its uses, also quite complex. In a text like this one, aimed
at beginners, I think it best to introduce it by starting with some of
its simplest uses. The simplest of all is to associate snippets of text
with a word, so that each time this word appears in the source file, it
is replaced by the text linked to it. This will allow us, on the one
hand, to save a lot of typing time and, on the other hand, as an extra
advantage, it reduces the possibilities of making mistakes when typing,
while ensuring that the text in question is always written the same way.

Let us imagine, for example, that we are writing a treatise on
alliteration in Latin texts, where we are often quoting the Latin
sentence “*O Tite tute Tati tibi tanta tyranne tulisti*”
(O Titus Tatius, you tyrant, so much you have brought upon yourself!).
It is a fairly long sentence in which two of the words are proper names
and start with capital letters, and where, let us admit it, as much as
we might love Latin poetry, it is easy for us to “trip up” when writing
it down. In this case, we could simply put in the preamble of our source
file:

`\define\Tite{\quotation{O Tite tute Tati tibi tanta tyranne tulisti}}`

Based on such a definition, each time the command `\Tite` appears in
our source file, it will be substituted by the sentence indicated, and
it will also be between quotation marks just as the original definition
had it, which allows us to ensure that the way that sentence appears
will always be the same. We could also have written it in italics, with
a larger font size… whatever we want. The important thing is that we
only have to write it once, and throughout the text it will be
reproduced exactly as it was written, as often as we want. We could also
create two versions of the command, called `\Tite` and `\tite`,
depending on whether the sentence needs to be written using capital
letters or not. The replacement text can be pure text, or include
commands, or form mathematical expressions in which there is more chance
of mistyping (at least for me). For example, if the expression <!--tex($(x_1,\ldots,x_n)$)tex-->![img](../../img/spinner.png) needs to appear regularly in our text, we could
create a command to represent it. For example

`\define\xvec{$(x_1,\ldots,x_n)$}`

so that whenever `\xvec` appears in the text, it is replaced by the
expression associated with it.

The general syntax of the `\define` command is as follows:

`\define[NumArguments]\CommandName{TeXtToReplace}`

where

  - **`NumArguments`** refers to the number of arguments the new
  command will take. If it doesn't need to take any, as in the examples
  given so far, this would be omitted.

  - **`CommandName`** refers to the name the new command will
  have. Here, the general rules regarding command names apply. The name
  could be a single character that is not a letter, or one or more
  letters without including any “non-letter” character.

  - **`TextToReplace`** contains the text that will replace the
  name of the new command, each time it is found in the source file.

The possibility of providing the new commands with arguments in their
definition gives this mechanism great flexibility, as it allows a
variable replacement text to be defined according to the arguments
taken.

For example: let us imagine that we want to write a command that
produces the opening of a business letter. A very simple version of this
would be:

```
\define\LetterHeading{
  \rightaligned{Peter Smith}\par
  \rightaligned{Consultant}\par
  Maryborough, \date\par
  Dear Sir,\par
  }
```

but it would be preferable to have a version of the command that would
write the name of the recipient in the header. This would require the
use of a parameter that communicates the name of the recipient to the
new command. This would require redefining the command as follows:

```
\define[1]\LetterHeading{
  \rightaligned{Peter Smith}\par
  \rightaligned{Consultant}\par
  Maryborough, \date\par
  Dear Mr #1,\par
  }
```

Note that we have introduced two changes in the definition. First of
all, between the key word `\define` and new name for the command, we
have included a 1 between square brackets ([1]). This tells ConTeXt
that the command we are defining will take one argument. Further on, in
the last line of the command definition, we have written “`Dear Mr \#1,`”, using the reserved character `\#`. This indicates
that at the point in the replacement text where `\#1` appears, the
contents of the first argument will be inserted. If it had two
parameters, `\#1` would refer to the first parameter and
`\#2` to the second. In order to call the command (in the source
file) after the command name, the arguments must be included between
curly brackets, each argument with its own set. So, the command that we
have just defined should be called in the following way in the text of
our source file:

`\LetterHeading{Name of addressee}`

For example: `\LetterHeading\{Anthony Moore\}`.

We could still further improve the previous function, because it assumes
that the letter will be sent to a man (it puts “Dear Sir”),
so perhaps we could include another parameter to distinguish between
male and female addressees. for example:

```
\define[2]\LetterHeading{
  \rightaligned{Peter Smith}\par
  \rightaligned{Consultant}\par
  Maryborough, \date\par
  #1\ #2,\par
  }
```

so that the function would be called, for example, with

`\LetterHeading{Dear Ms}{Eloise Merriweather}`

although this is not very elegant (from a programming point of view). It
would be preferable for symbolic values to be defined for the first
argument (man/woman; 0/1; m/f) so that the macro itself would choose the
appropriate text according to this value. But explaining how to achieve
this requires us to get into more depth than I think the novice reader
can understand at this stage.

### Creating new environments

To create a new environment, ConTeXt provides the
`\definestartstop` command whose syntax is as follows:

`\definestartstop[Name][Options]`

!!! note ""
    
    In the *official* definition of `\definestartstop` (see
    [section 3.6](#the-official-list-of-context-commands)) there is an additional argument that I
    have not put above because it is optional, and I have not been able to
    found out what it is for. Neither the introductory ConTeXt
    “Excursion”, nor the incomplete reference manual explain it.
    I had assumed that this argument (which must be entered between the
    name and the configuration) could be the name of some existing
    environment that would serve as an initial model for the new
    environment, but my tests show that this assumption was wrong. I have
    looked on the ConTeXt mailing list and I have not seen any use of
    this possible argument.

where

  - **Name** is the name the new environment will have.

  - **Configuration** allows us to configure the behaviour of the
  new environment. We have the following values with which we can
  configure it:

    - `before` &mdash; Commands that have to be run before entering
    the environment.

    - `after` &mdash; Commands that have to be run after leaving the
    environment.

    - `style` &mdash; Style that the text of the new environment must
    have.

    - `setups` &mdash; Set of commands created with
      \PlaceMacro{startsetups}`\startsetups … \stopsetups`. This
      command and its use is not explained in this introduction.

    - `color, inbetween, left, right` &mdash; Undocumented options that I have not been able to make work. We can assume what some do because of their name, for example `color`, but from more tests I have done, indicating some value for that option, I do not see any change within the environment.

```
\definestartstop
  [TextWithBar]
  [before=\startmarginrule\noindentation,
    after=\stopmarginrule,
    style=\ss\sl
  ]

\starttext

The first two fundamental laws of human stupidity state unambiguously
that:

\startTextWithBar

  \startitemize[n,broad]

    \item Always and inevitably we underestimate the number of stupid
    individuals in the world.

    \item The probability that a given person is stupid is independent
    of any other characteristic of the same person.

  \stopitemize

\stopTextWithBar

\stoptext
```

The result would be:

<!--tex[whole](\definestartstop
  [TextWithBar]
  [before=\startmarginrule\noindentation,
    after=\stopmarginrule,
    style=\ss\sl
  ]

\starttext

The first two fundamental laws of human stupidity state unambiguously
that:

\startTextWithBar

  \startitemize[n,broad]

    \item Always and inevitably we underestimate the number of stupid
    individuals in the world.

    \item The probability that a given person is stupid is independent
    of any other characteristic of the same person.

  \stopitemize

\stopTextWithBar

\stoptext)tex-->![img](../../img/spinner.png)

If we want our new environment to be a group ([section 3.8.1](#groups)),
so that any alteration of the normal functioning of ConTeXt that
happens within it disappears on leaving the environment, we must include
the `\bgroup` command in the `before`
option, and the `\egroup` command in the
`after` option.

## Other fundamental concepts

There are other notions, other than commands, that are fundamental to
understanding the logic behind how ConTeXt works. Some of them,
because of their complexity, are not appropriate for an introduction and
therefore will not be dealt with in this document; but there are two
notions that should be examined now: groups and dimensions.

### Groups

A group is a well-defined fragment of the source file that ConTeXt
uses as a *working unit* (what this means is explained shortly).
Every group has a beginning and end that needs to be expressly
indicated. A group begins:

  - With the reserved character “`{`” or with the command `\bgroup`.

  - With the command `\begingroup`

  - With the command `\start`

  - With the opening of certain environments (`\startSomething` command).

  - By beginning a maths environment (with the reserved character «$»).

and is closed

  - With the reserved character “`}`” or with the command `\egroup`.

  - With the command `\endgroup`

  - With the command `\stop`

  - With the closing of the environment (`\stopSomething` command).

  - On leaving the maths environment (with the reserved character «$»).

Certain commands also automatically generate a group, for example,
`\hbox`, `\vbox` and, in  general, commands linked to the creation
of *boxes*[^5]. Outside
of these latter cases (groups automatically generated by certain
commands), the way of closing a group has to be consistent with the way
it is opened. This means that a group that is begun with “`{`”must
close with “`}`”, and a group begun with `\begingroup` must be
closed with `\endgroup`. This rule has only one exception, that a
group begun with “`{`”can be closed with `\egroup`, and the
group begun with `\bgroup` can be closed with “`}`”; in reality,
this means that “`{`” and `\bgroup` are completely synonymous
and interchangeable, and similarly for “`}`” and `\egroup`.

!!! note ""
    
    The commands `\bgroup` and
    `\egroup` were designed to be able to define
    commands to open a group and others to close a group. Therefore, for
    reasons internal to TeX syntax, those groups could not be opened and
    closed with curly brackets, since this would generate unbalanced curly
    brackets in the source file, and this would always throw an error when
    compiling.
  
    The commands `\begingroup` and
    `\endgroup`, by contrast, are not
    interchangeable with curly brackets or the `\bgroup … \egroup`
    commands, since a group begun with `\begingroup` has to be closed
    with `\endgroup`. These latter commands were designed to allow for
    much more in-depth error checking. In general, normal users do not
    have to use them.

We can have nested groups (a group within another group), and in this
case the order in which groups are closed must be consistent with the
order in which they were opened: any subgroup has to be closed within
the group in which it began. There can also be empty groups generated
with “`{}`”. An empty group, in principle, has no effect on the
final document, but it can be useful, for example, for indicating the
end of a command name.

The main effect of the groups is to encapsulate their content: as a
rule, the definitions, formats and value assignments that are made
within a group are “forgotten” once we leave the group. This
way, if we want ConTeXt to temporarily alter its normal way of
functioning, the most efficient way is to create a group and, within it,
alter that functioning. Thus, when we leave the group, all the values
and formats previous to it will be restored. We have already seen some
examples of this when mentioning commands like `\it`, `\bf`,
`\sc`, etc. But this doesn't only happen with format commands: the
group in a way *isolates* its contents, so that any change in any of
the many internal variables that ConTeXt is constantly managing, will
remain effective only as long as we are within the group in which that
change took place. Likewise, a command defined within a group will not
be known outside it.

So, if we process the following example

```
\define\A{B}
\A
{
  \define\A{C}
  \A
}
\A
```

we will see that the first time we run the command `\A`, the result
corresponds to that of its initial definition (‘B’). Then we
created a group and redefined the command `\A` within it. If we run
it now within the group, the command will give us the new definition
(‘C’ in our example), but when we leave the group in which the
command `\A` was redefined, if we run it again it will type ‘B’
once more. The definition made within the group is “forgotten”
once we have left it.

Another possible use of the groups concerns those commands or
instructions designed to apply exclusively to the character that is
written after them. In this case, if we want the command to be applied
to more than one character, we must enclose the characters we want the
command or instruction to be applied to, in a group. So for example, the
reserved `\letterhat` character which, we already know, converts
the following character into a superscript when used inside the maths
environment; so if we write, for example, `\$4^2x\$` we will get
“<!--tex($4^2x$)tex-->![img](../../img/spinner.png)”. But if we write “`$4^{2x}$}`” we will get
“<!--tex($4^{2x}$)tex-->![img](../../img/spinner.png)”.

Finally: a third use of grouping is to tell ConTeXt that what is
enclosed within the group must be treated as one. This is the reason why
before ([section 3.5](#summary-of-command-syntax-and-options-and-on-the-use-of-square-and-curly-brackets-when-calling-them)) it was said that on certain occasions
it is better to enclose the contents of some command option within curly
brackets.

### Dimensions

Although we could use ConTeXt perfectly without worrying about
dimensions, we would not be able to make use of all the configuration
possibilities without giving them some consideration. Because to a large
extent the typographical perfection achieved by TeX and its
derivatives lies in the great attention that the system pays internally
to dimensions. Characters have dimensions; the space between words, or
between lines, or between paragraphs have dimensions; lines have
dimensions; margins, headers and footers. For almost every element on
the page we can think of there will be some dimension.

In ConTeXt dimensions are indicated by a decimal number followed by
the unit of measurement. The units that can be used are found in
table 3.2.

| Name         | Name in ConTeXt | Equivalent            |
|:------------:|:---------------:|:---------------------:|
| Inch         | in              | 1 in = 2.54 cm        |
| Centimetre   | cm              | 2.54 cm = 1 inch      |
| Millimetre   | mm              | 10 mm = 1 cm          |
| Point        | pt              | 72.27 pt = 1 inch     |
| Big point    | bp              | 72 bp = 1 inch        |
| Scaled point | sp              | 65536 sp = 1 point    |
| Pica         | pc              | 1 pc = 12 points      |
| Didot        | dd              | 1157 dd = 1238 points |
| Cicero       | cc              | 1 cc = 12 didots      |
|              | em              |                       |
|              | ex              |                       |

(Table 3.2: Units of measurement in ConTeXt)

The first three units in the table 3.2 are standard
measures of length; the first is used in some parts of the
English-speaking world and the others outside it or in some parts of it.
The remaining units come from the world of typography. The last two, for
which I have put no equivalent, are relative units of measurement based
on the current font. 1 “em” is equal to the width of an
“M” and an “ex” is equal to the height of an
“x”. The use of measures related to font size allows the
creation of macros that look just as good whatever the source used at
any given moment. That is why, in general, it is recommended.

With very few exceptions, we can use any unit of measurement we prefer,
as ConTeXt will convert it internally. But whenever a dimension is
indicated, it is compulsory to indicate the unit of measurement, and
even if we want to indicate a measurement of “0”, we have to
say ‘0pt’ or ‘0cm’. Between the number and the name of the
unit, we may or may not leave a blank space. If the unit has a decimal
part, we can use a decimal separator, either the (.) or the comma (,).

The measurements are usually used as an option for some command. But we
can also directly assign a value to some internal measure of ConTeXt
as long as we know the name of it. For example, indentation of the first
line of an ordinary paragraph is internally controlled by ConTeXt with
a variable called `\parindent`. By expressly
assigning a value to this variable we will have altered the measurement
that ConTeXt uses from that point on. And so, for example, if we want
to eliminate the indentation of the first line, we only need to write in
our source file:

`\parindent=0pt`

We could also have written `\parindent 0pt` (without the equal sign)
or `\parindent0pt` with no space between the name of the measure and
its value.

However, assigning a value directly to an internal measure is considered
“inelegant”. In general, it is recommended to use the commands
that control that variable, and to do so in the preamble of the source
file. The opposite results in source files that are very difficult to
debug because not all the configuration commands are in the same place,
and it is really difficult to obtain a certain consistency in
typographical characteristics.

Some of the dimensions used by ConTeXt are “elastic”, that
is, depending on the context, they can take one or other measure. These
measures are assigned with the following syntax:

`\MeasureName plus MaxIncrement minus MaxDecrease`

For example

`\parskip 3pt plus 2pt minus 1pt`

With this instruction we are telling ConTeXt to assign to
`\parskip` (indicating the vertical distance
between paragraphs) a *normal* measurement of 3 points, but that if
the composition of the page requires it, the measurement can be up to 5
points (3 plus 2) or only 2 points (3 minus 1). In these cases it will
be left to ConTeXt to choose the distance for each page between a
minimum of 2 points and a maximum of 5 points

## Self-learning method for ConTeXt

The huge quantity of ConTeXt commands and options turns out to be
truly overwhelming  and can give us the feeling that we will never end
up learning to work well with it. This impression would be a mistake,
because one of the advantages of ConTeXt is the uniform way it handles
all its structures: learning well a few structures, and knowing, more or
less, what the remaining ones are for, when we need some extra utility
it will be relatively easy learn to use it. Therefore, I think of this
introduction as a kind of *training* that will prepare us to make
our own investigations.

To create a document with ConTeXt it is probably only essential to
know the following five things (we could call them the ConTeXt *Top Five*):

  - Know how to create the source file or project of any; this is
  explained in \in{Chapter}[cap:sourcefile] of this introduction.

  - Set the main font for the document, and know the basic commands
    to change font and colour (\in{Chapter}[sec:fontscol]).

  - Know the basic commands for structuring the content of our
  document, such as chapters, sections, subsections, etc. This is all
  explained in \in{Chapter}[cap:structure].

  - Perhaps know how to handle the *itemize* environment
  explained in some detail in \in{section}[sec:itemize].

  - … and little else.

For the rest, all we need to know is that it is possible. Certainly no
one will use a utility if they do not know that it exists. Many of them
are explained in this introduction; but, above all, we can repeatedly
watch how ConTeXt always acts when faced with a certain type of
construction:

  - First there will be a command that allows it to do so.

  - Second, there is almost always a command that allows us to
  configure and predetermine how the task will be carried out; a command
  whose name starts with `\setup` and usually coincides with the
  basic command.

  - Finally, it is often possible to create a new command to perform
  similar tasks, but with a different configuration.

To see whether these commands exist or not, look up the official list of
commands (see [section 3.6](#the-official-list-of-context-commands)), which will also inform us
of the configuration options that these commands support. And although
at first glance the names of these options may seem *cryptic*, We
will soon see that there are options that are repeated in many commands
and that work the same or very similarly in all of them. If we have
doubts about what an option does, or how it works, it will be enough to
generate a document and test it. We can also look at the abundant
ConTeXt documentation. As is common in the world of free software,
ConTeXt Standalone includes the sources of almost all its documentation in the
distribution. A utility like `grep` (for GNU Linux systems) can
help us search whether the command or option that we have doubts about
is used in any of these source files so that we can have an example on
hand.

This is how learning ConTeXt has been conceived: the introduction
explains in detail the five (actually four) aspects that I have
highlighted, and many more: as we read, a clear picture of the sequence
will form in our minds: *a command to carry out the task* &mdash; *a
command that configures the previous one* &mdash; *a command that allows
us to create a similar command*. We will also learn some of the  main
structures of ConTeXt, and we will know what they are for.


[^1]: In computer
terminology, the key that affects the interpretation of the following
character is called the *escape character*. By contrast, the *escape key* on keyboards is called this because it generates character
27 in ASCII code, which is used as the escape character in this
encoding. Today, the uses of the Escape key are more associated with the
idea of cancelling an ongoing action.

[^2]:
**Note:** two conventions are followed in cases where, to
illustrate something in this introduction, a fragment of source code is
written as well as the result of compiling it: sometimes the code and
the result of its compilation are placed next to each other in a
two-column paragraph; other times the code is written in
\color[purple]{dark magenta shade} which is generally used in this
document to represent ConTeXt commands, and the result of its
compilation in red.}}

[^3]: Regarding the “␣” symbol, recall the note on \at{page}[note:invisible space].

[^4]: Though not always; it depends on the
environment in question and on the situation in the rest of the
document. ConTeXt differs from LaTeX in this regard, which is much
stricter.

[^5]: The *box* notion is also a central ConTeXt
one, but its explanation is not included in this introduction.