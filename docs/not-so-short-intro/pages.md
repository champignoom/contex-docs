# Pages and document pagination

ConTeXt transforms the source document into correctly formatted *pages*. What these pages look like, how the text and blank spaces are
distributed and what elements they have, are all fundamental for good
typesetting. This chapter is dedicated to all these questions, and to
some other matters relating to pagination.

## Page size

### Setting page size

By default, ConTeXt assumes that documents will be of A4 size, the
European standard. We can establish a different size with
`\setuppapersize` that is the typical command found in the document
preamble. The *normal* syntax of this command is:

`\setuppapersize[LogicalPage][PhysicalPage]`

where both arguments take symbolic names.[^1]
The first argument, that I have called *LogicalPage*, represents the page size to be taken into consideration
for typesetting; and the second argument, *PhysicalPage*, represents
the size of the page it will be printed on. Normally both sizes are the
same, and the second argument can then be omitted; however, on occasions
the two sizes can be different, as, for example, when printing a book in
sheets of 8 or 16 pages (a common printing technique, especially for
academic books until approximately the 1960s). In these cases, ConTeXt
allows us to distinguish both sizes; and if the idea is that several
pages are to be printed on a single sheet of paper, we can also indicate
the folding scheme to be followed by using the  `\setuparranging`
command (which will not be explained in this introduction).

For typesetting size we can indicate any of the predefined sizes used by
the paper industry (or by ourselves). This includes:



  - Any of the A, B and C series defined by the ISO-216 (from A0 to
  A10, from B0 to B10 and from C0 to C10), generally in use in Europe.

  - Any of the US standard sizes: letter, ledger, tabloid, legal,
  folio, executive.

  - Any of the RA and RSA sizes defined by the ISO-217 standard.

  - The G5 and E5 sizes defined by the Swiss SIS-014711 standard
  (for doctoral theses).

  - For envelopes: any of the sizes defined by the North American
  standard (envelope 9 to envelope 14) or by the ISO-269 standard
  (C6/C5, DL, E4).

  - CD, for CD covers.

  - S3 – S6, S8, SM, SW for screen sizes in documents not intended
  to be printed but shown on screen.



  Together with the paper size, with `\setuppapersize` we can
  indicate page orientation: “portrait” (vertical) or
  “landscape”(horizontal).

!!! note ""
    
      Other options that `\setuppapersize` allows, according to the
      ConTeXt wiki, are `rotated`, `90`, `180`,
      `270`, `mirrored` and  `negative`. In my own tests I
      have only noticed some perceptible changes with `rotated` that
      inverts the page, although it is not exactly an inversion. The
      numerical values are supposed to produce the equivalent degree of
      rotation, on their own or in combination with `rotated`, but I
      have been unable to get them to work. Nor have I exactly
      discovered what `mirrored` and `negative` are for.
    


The second argument of `\setuppapersize`, that I have already said
can be omitted when the print size is no different from the typesetting
size, can take the same values as the first, indicating paper size and
orientation. It can also take `oversized` as a value that --
according to ConTeXt wiki -- adds a centimetre and a half to each
corner of the paper.

!!! note ""
    
      According to the wiki there are other possible values for the second
      argument: `undersized`, `doublesized` and
      `doubleoversized`. But in my own tests I have not seen any
      change after using any of these; nor does the official definition of
      the command (see \in{section}[sec:qrc-setup-en]) mention these
      options.

### Using non-standard page sizes

If we want to use a non-standard page size, there are two things we can
do:

- Use an alternative syntax of `\setuppapersize` that allows us
to introduce the height and width of the paper as dimensions.

- Define our own page size, assigning a name to it and using it as
  if it were a standard paper size.

#### Alternative syntax of `\setuppapersize`

Other than the syntax we have already seen, `\setuppapersize` allows
us to use this other one:

`\setuppapersize`[Name][Options]

where *Name* is an optional argument that represents the name
assigned to a paper size with `\definepapersize` (that we will look
at next), and *Options* are of the kind where we assign an explicit
value. Among the allowable options we can highlight the following:

- **`width, height`** that represent, respectively, the width and
  height of the page. 
  
- **`page, paper`**. The first refers to the size of the page to
be typeset, and the second to the size of the page to be physically
printed on. This means that `page` is equivalent to the first
argument of `\setuppapersize` in its normal syntax (explained above)
and `paper` to the second argument. These options can take the
same values indicated earlier (A4, S3, etc.).

- **`scale`**, indicates a scaling factor for the page.

- **`topspace, backspace, offset`**, additional distances.

#### Defining a customised page size

To define a customised page size, we use the `\definepapersize`
command, whose syntax is

`\definepapersize[Name][Options]`

where *Name* refers to the name given to the new size and *Options* can be:

- Any of the allowable values for `\setuppapersize` in its normal
syntax (A4, A3, B5, CD, etc).

- Measurements of width (of the paper), height (of the paper) and
  offset (displacement), or a scaled value (`scale`).

What is not possible is to mix the values allowed for
`\setuppapersize` with measurements or scale factors. This is because
in the first case the options are symbolic words and in the second,
variables given an explicit value; and in ConTeXt, as I have already
said, it is not possible to mix both kinds of options.

When we use `\definepapersize` to indicate a paper size that
coincides with some of the standard measurements, in actual fact, rather
than defining a new paper size, what we are doing is defining a new name
for an already existing paper size. This can be useful if we want to
combine a paper size with an orientation. So, for example, we can write

```tex
\definepapersize[vertical][A4, portrait]
\definepapersize[horizontal][A4, landscape]
```

### Changing the page size at any point in the document

In most cases documents only have one page size and this is why
`\setuppapersize` is the typical command we include in the preamble
and use only once in each document. However, on some occasions it might
be necessary to change the size at some point in the document; for
example, if from a certain point onwards an annex is included in which
the sheets are landscape. 

In such cases we can use `\setuppapersize` at the precise point where
we want the change to happen. But since the size would change
immediately, to avoid unexpected results we would normally insert a
forced page break before `\setuppapersize`.

If we only need to change the page size for an individual page, instead
of using `\setuppapersize` twice, once to change to the new size, and
the second to return to the original size, we can use
`\adaptpapersize` that changes the page
size, and, a page later, automatically resets the value prior to it
being called. And just the same as we did with `\setuppapersize`,
before using `\adaptpapersize` we should insert a forced page break.

### Adjusting the page size to its contents

There are three environments in ConTeXt that generate pages of the
exact size for storing their contents. These are
`\startMPpage`,
`\startpagefigure` and
`\startTEXpage`. The first generates a page
that contains a graphic generated with MetaPost, a graphic design
language that integrates with ConTeXt, but which I will not deal with
in this introduction. The second does the same with an image and perhaps
some text beneath it. It takes two arguments: the first identifies the
file containing the image. I will deal with this in the chapter
dedicated to external images. The third (`\startTEXpage`) contains
the text which is its contents on a page. Its syntax is:

`\startTEXpage[Options] … \stopTEXpage`

where the options can be any of the following:

- **`strut`**. I am not sure about the usefulness of this option.
In ConTeXt terminology, a *strut* is a character lacking width,
but with maximum height and depth, but I don't quite see what
that has to do with the overall usefulness of this command. According to
the wiki this option allows for the values `yes`, `no`,
`global` and `local`, and where the default value is
`no`.

- **`align`**. Indicates text alignment. This can be
  `normal`,`flushleft`, `flushright`, `middle`,
  `high`, `low` or  `lohi`.
  
- **`offset`** to indicate the amount of white space around the
  text. It can be `none`, `overlay` if an overlay effect is
  desired, or an actual dimension.
  
- **`width, height`** where we can indicate a width and height
  for the page, or the value `fit` so that the width and height
  are those required by the text that is included in the environment.
  
- **`frame`** that is `off` by default but can take the
  value `on` if we want a border around the text on the page.

## Elements on the page

ConTeXt recognises different elements on pages, whose dimensions can
be configured with `\setuplayout`. We will look at this immediately,
but beforehand it would be best to describe each of the page elements,
indicating the name that `\setuplayout` knows each of them by:

- **Edges**: white space surrounding the text area. Although most
word processors call them “margins”, using ConTeXt's
terminology is preferable since it enables us to differentiate between
edges as such, where there is no text (although in electronic documents
there can be navigation buttons and the like), and margins  where
certain text elements can sometimes be located, like, for example,
margin notes.

  - The height of the upper edge is controlled by two measurements:
  the upper edge itself (`top`) and the distance between the upper
  edge and the header (`topdistance`). The sum of these two
  measurements is called `topspace`.

  - The size of the left and right edges depends on the
  `leftedge` `rightedge` measurements respectively. If we
  want both to be of the same length we can configure them
  simultaneously with the `edge` option.

    In documents intended for double-sided printing, we don't talk about
    left and right edges but inner and outer ones; the first is the edge
    closest to the point where the sheets will be stapled or sewn, i.e.
    the left edge on odd-numbered pages and the right edge on
    even-numbered pages. The outer edge is the opposite of the inner
    edge.

  - The height of the lower edge is called `bottom`.

- **Margins** properly so called. ConTeXt only calls side
margins (left and right) margins. Margins are located between the edge
and the main text area and are intended to host certain text elements
such as, for example, margin notes, section titles or their numbers.

  The dimensions that control margin size are:



  - **`margin`**: used when we want to simultaneous set the
  margins at the same size.

  - **`leftmargin, rightmargin`**: set the size of the left and
  right margins respectively.

  - **`edgedistance`**: Distance between the edge and the margin.

  - **`leftedgedistance, rightedgedistance`**: Distance between
  the edge and the left and right margins respectively.

  - **`margindistance`**: Distance between the margin and the
  main text area.

  - **`leftmargindistance, rightmargindistance`**: Distance
  between the main text area and right and left margins respectively.

  - **`backspace`**: this measurement represents the space
    between the left corner of the paper and the beginning of the main
    text area. Therefore it is made up of the sum of `leftedge` +
    `leftedgedistance` + `leftmargin` +
    `leftmargindistance`.
    


- {\bf Header and footer:} The header and footer of a page are two
areas that are located, respectively, in the top or bottom of the
written area of the page.They usually contain information that helps to
contextualise the text, such as the page number, the name of the author,
the title of the work, the title of the chapter or section, etc. In
ConTeXt these areas on the page are affected by the following
dimensions:



  - **`header`**: Height of the header.

  - **`footer`**: Height of the footer

  - **`headerdistance`**: Distance between the header and the
  page's main text area.

  - **`footerdistance`**: Distance between the footer and the
  page's main text area.

  - **`topdistance, bottomdistance`**: Both mentioned previously.
  They are the distance between the upper edge and header or the lower
  edge and footer, respectively.



- **Main text area**: this is the widest area on the page, holding
  the document's text. It size depends on the `width` and
  `textheight` variables. The `height` variable, for its
  part, measures the sum of `header`, `headerdistance`,
  `textheight`, `footerdistance` and `footer`.
  


\placefigure
  [here]
  [img:page layout]
  {Areas and measurements on a page}
  {\externalfigure[PageLayout.png][width=.8\textwidth]}

We can see all these areas in \in{image}[img:page layout] along with the
names given to the corresponding measurements, and arrows indicating
their extent. The thickness of the arrows together with the size of the
names of the arrows are intended to reflect the importance of each of
these distances for the page layout. If we look closely, we will see
that this image shows that a page can be represented as a table with 9
rows and 9 columns, or, if we do not take into account the separation
values between the different areas, there would be five rows and five
columns of which there can only be text in three rows and three columns.
The intersection of the middle row with the middle column constitutes
the main text area and will normally take up the majority of the page.

In the layout phase of our document, we can see all the page
measurements with `\showsetups`. To see the
main outlines of text distribution indicated visually on the page, we
can use `\showframe`; and with
`\showlayout` we can get a combination of
the previous two commands.

## Page layout (`\setuplayout`)

### Assigning a size to the different page components

Page design involves assigning specific sizes to the respective areas of
the page. This is done with `\setuplayout`. This command allows us to
alter any of the dimensions mentioned in the previous section. Its
syntax is as follows:

`\setuplayout [Name] [Options]`

where *Name* is an optional argument used only for the case where we
have designed multiple layouts (see \in{section}[sec:definelayout]), and
the options are, besides others we will see later, any of the
measurements previously mentioned. Bear in mind, however, that these
measurements are inter-related since the sum total of the components
affecting width, of those affecting height must coincide with the width
and height of the page. In principle this will mean that when changing a
horizontal length, we must adjust the remaining horizontal lengths; and
the same when adjusting a vertical length.

By default, ConTeXt only carries out automatic adjustments of
dimensions in some cases which, on the other hand, are not indicated in
any complete or systematic way in its documentation. By carrying out
several tests I was able to verify, for example, that a manual increase
or decrease in the height of the header or footer entails an adjustment
in `textheight`; however a manual change of some of the margins
does not automatically adjust (according to my tests) the text width
(`width`). This is why the most efficient way to not generate any
inconsistency between the page size ( set with `\setuppapersize`) and
the size of its respective components, is:

- Regarding horizontal measurements:

  - By adjusting `backspace` (that includes `leftedge`
  and `leftmargin`).

  - By adjusting `width` (text width) not with a dimensions
  but with the `fit` or `middle` values:

    - `fit` calculates the width of the text on the basis of the
    width of the rest of the page's horizontal components.

    - `middle` does the same, but first makes right and left
    margins equal.

- Regarding vertical measurements:

  - By adjusting `topspace`.

  - By adjusting the `fit` or `middle` values to
  `height`. These work the same way as in the case of width. The
  first calculates the height based on the rest of the components, and
  the second first makes the upper and lower margins equal, and then
  calculates the text height.

  - Once `height` is adjusted, by adjusting the height of the
  header or footer if necessary, knowing that in such cases
  `textheight` will be automatically readjusted.

- Another possibility for indirectly determining the height of the
main text area, is by indicating the number of lines that are to fit in
it (bearing in mind the current interline space and font size). This is
why `\setuplayout` includes the `lines` option.

#### Placing the logical page on the physical page

In the case where the logical page size is not the same as the physical
page size (see \in{section}[sec:pagesize]) `\setuplayout` allows us
to configure some additional options affecting the placement of the
logical page on the physical page:

- **`location`**: This option determines the place where the page
will be placed on the physical page. Its possible values are left,
middle, right, top, bottom, singlesided, doublesided or duplex.

- **`scale`**: Indicates a scaling factor for the page before
placing it on the physical page.

- **`marking`**: Will print visual marks on the page to indicate
where the paper is to be cut.

- **`horoffset, veroffset, clipoffset, cropoffset, trimoffset, bleedoffset, artoffset`**: A series of measures indicating different
displacements in the physical page. Most of these are explained in the
2013 reference manual.

These `\setuplayout` options must be combined with indications from
`\setuparranging` that indicates how
logical pages are to be ordered on the physical sheet of paper. I will
not explain these commands in this introduction, since I haven't carried
out any tests on them.

#### Getting the width and heights of the text area

The `\textwidth` and
`\textheight` commands return the width and
height of the text area respectively. The values these commands offer
cannot be directly shown in the final document, but they can be used for
other commands to set their width or height measurements. So, for
example, to indicate that we want an image whose width will be 60\% of
the width of the line, we need to indicate as the value of the image's
`width` option: `width=0.6\backslash textwidth`.

### Adapting the page layout

It could be that our page layout on a particular page produces an
undesired result; like, for example, the final page of a chapter with
only one or two lines, which is neither typographically or aesthetically
desirable. To solve these cases, ConTeXt provides the
`\adaptlayout` command that allows us to alter the size of the text
area on one or more pages. This command is intended to be used only when
we have already finished writing our document and are making some small
final adjustments. Therefore, its natural location is in the preamble to
the document. The command's syntax is:

`\adaptlayout [Pages] [Options]`

where *Pages* refers to the number of the page or pages whose layout
we want to change. It is an optional argument that is to be used only
when `\adaptlayout` is placed in the preamble. We can indicate just
one page, or several pages, separating the numbers with comnmas. If we
omit this first argument, `\adaptlayout` will exclusively affect the
page on which it finds the command.

As for the options, they can be:

- **`height`**: Allows us to indicate, as a dimensions, the
height the page in question should have. We can indicate an absolute
height (e.g. “19cm”) or a relative height (e.g. “+1cm”, “-0.7cm”).

- **`lines`**:  We can include the number of lines to add or
subtract. To add lines the value is preceded by a +, and to subtract
lines, by the <!--tex($-$)tex-->![img](../../img/spinner.png) sign (not just a hyphen).

Consider that when we change the number of lines on a page, this could
affect the pagination of the rest of the document. this is why it is
recommended that we use `\adaptlayout` only at the end, when the
document will not have further changes, and to do it in the preamble.
Then we go to the first page we wish to adapt, do so and check how it
affects the pages that follow; if it affects it in such a way that
another page needs adapting, we add its number and compile once again,
and so on.

### Using multiple page layouts

If we need to use different layouts in different parts of the document,
the best way is to begin by defining the *general* layout and then
the various alternative ones, those that only change the dimensions that
need to be different. These alternative layouts will inherit all the
features of the overall layout which will not change as part of its
definition. To specify an alternative layout and give it a name we can
later call it with, we use the `\definelayout` command whose general
syntax is:

`\definelayout [Name/Number] [Configuration]`

where *Name/Number* is the name associated with the new design, or
the page number where the new layout will be automatically activated,
and *Configuration* will contain the aspects of the layout that we
wish to change by comparison with the overall layout.

When the new layout is associated with a name, to call it at a
particular point in the document we use:

`\setuplayout [LayoutName]`

and to return to the general layout:

`\setuplayout [reset]`

If, on the other hand, the new layout was associated with a specific
page number, it will be automatically activated when the page is
reached. However, once activated, to return to the general design we
will have to explicitly indicate this, even though we can *semi-automate* this. For example, if we want to apply a layout
exclusively to pages 1 and 2, we can write in the document's preamble: 

```
\definelayout[1][…]
\definelayout[3][reset]
```

The effect of these commands will be that the layout defined in the
first line is activated on page 1 and on page 3 another layout is
activated the function of which is only to return to the general layout.

With `\definelayout[even]` we create a layout that is activated on
all even pages; and with `\definelayout[odd]` the layout will be
applied to all odd pages.

### Other matters related to page layout

#### Distinguishing between odd and even pages

In double-sided printed documents it is often the case that the header,
page numbering and side margins differ between odd and even pages.
Even-numbered pages are also called left hand (verso) pages and odd
pages, right hand (recto) pages. In these cases it is also usual for the
terminology regarding margins to change, and we talk about inner and
outer margins. The former is located at the closest point to where the
pages will be sewn or stapled and the latter on the opposite side. On
odd-numbered pages, the inner margin corresponds to the left margin and
on even pages the outer margin corresponds to the right margin.

`\setuplayout` does not have any option expressly allowing us to tell
it that we want to differentiate between the layout for odd and even
pages.  This is because for ConTeXt the difference between both kinds
of pages is set with a different option: `\setuppagenumbering` that
we will see in \in{section}[sec:numpages]. Once this has been set,
ConTeXt assumes that the page described with `\setuplayout` was the
odd page, and builds the even page by applying the inverted values for
the odd page to it: the specifications applicable on the odd-numbered
page apply to the left, on the even-numbered page they apply to the
right; and vice versa: those applicable on the odd-numbered page on the
right, apply to the even-numbered page on the left.

#### Pages with more than one column

With `\setuplayout` we can also see that the text of our document is
distributed across two or more columns, in the way that newspapers and
some magazines do, for example. This is controlled by the
`columns` option the value of which has to be a whole number. When
there is more than one column, the distance between the columns is
indicated by the `columndistance` option.

This option is intended for documents in which all the text (or most of
it) is distributed across multiple columns. If, in a document that is
mainly a one column document, we want a particular part to be two or
three columns, we do not need to alter the page layout but simply use
the `columns` environment (see
\in{section}[sec:multiplecolumns]).

## Page numbering

By default, ConTeXt uses Arabic numbers for page numbering and the
number appears centred in the header. To alter these features, ConTeXt
it has different procedures which, in my opinion, make it unnecessarily
complex where this matter is concerned.

Firstly, the fundamental characteristics of numbering are controlled by
two different commands:
`\setuppagenumbering` and
`\setupuserpagenumber`.

`\setuppagenumbering` allows the following options:

- **`alternative`**: This option controls whether the document is
designed so that the header and footer are identical on all pages
(`singlesided`), or whether they differentiate odd and even pages
(`doublesided`). When this option takes the latter value,
automatically the page layout values introduced by `setuplayout`
are affected, so that it is assumed that what is indicated in
`setuplayout` refers only to odd-numbered pages, and therefore
what is arranged for the left margin actually refers to the inner margin
(which on even-numbered pages is on the right) and that what is arranged
for the right side actually refers to the outer margin, which on
even-numbered pages is on the left.

- **`state`**: Indicates whether or not the page number will be
displayed. It allows two values: start (page number will be displayed)
and stop (page numbers will be suppressed). The name of these values
(start and stop) could make us think that when we have
`state=stop` pages stop being numbered, and when
`state=start` numbering begins again. But this is not so: these
values only affect whether the page number is shown or not.

- **`location`**: indicates where it will be displayed. Normally
we need to indicate two values in this option, separated by a comma.
First of all we need to specify if we want the page number in the header
(`header`) or the footer (`footer`), and then, where in the
header or footer: it could be `left`, `middle`,
`right`, `inleft`, `inright`, `margin`,
`inmargin`, `atmargin` or `marginedge`. For example:
to show right-aligned numbering in the footer we should indicate
\MyKey{location=\{footer,right\}}. See, on the other hand, how we have
surrounded this option with curly brackets so ConTeXt can correctly
interpret the separating comma.

- **`style`**: indicates font size and style to be used for page
numbers.

- **`color`**: Indicates the colour to be applied to the page
number.

- **`left`**: picks up the command or text to be executed to the
left of the page number.

- **`right`**: picks up the command or text to be executed to the
right of the page number.

- **`command`**: picks up a command to which the page number will
be passed as a parameter.

- **`width`**: indicates the width taken up by the page number.

- **`strut`**: I am not so sure about this. In my tests, when
`strut=no`, the number is printed exactly on the upper edge of the
header or on the bottom of the footer, while when `strut=yes`
(default value) a space is applied between the number and the edge.

`\setupuserpagenumber`, allows these extra options:

- **`numberconversion`**: controls the kind of numbering that can
be arabic (`n`, `numbers`), lower case (`a`,
`characters`), upper case (`A`,`Characters`), small
caps (`KA`), lower case roman (`i`, `r`,
`romannumerals`), uppercase roman (`I`, `R`,
`Romannumerals`) or small caps roman (`KR`).

- **`number`**: indicates the number to assign to the first page,
on the basis of which the rest will be calculated.

- **`numberorder`**: if we assign `reverse` to this as a
value, page numbering will be in decreasing order; this means the last
page will be 1, the second-last 2, etc.

- **`way`**: allows us to indicate how numbering will proceed. It
can be: byblock, bychapter, bysection, bysubsection, etc.

- **`prefix`**: allows us to indicate a prefix to page numbers.

- **`numberconversionset`**: Explained in what follows.

In addition to these two commands, it is also necessary to take into
account the control of numbers involving the document's macrostructure
(see \in{section}[sec:macrostructure]). From this point of view,
`\defineconversionset` allows us to
indicate a different kind of numbering for each of the macrostructure
blocks. For example:

```tex
\defineconversionset
  [frontpart:pagenumber][][romannumerals]

\defineconversionset
  [bodypart:pagenumber][][numbers]

\defineconversionset
  [appendixpart:pagenumber][][Characters]
```

will see that the first block in our document (frontmatter) is numbered
with lower case Roman numbers, the central block (bodymatter) with
Arabic numbers and the appendices with upper case letters.

We can use the following commands to get the page number:

- `\userpagenumber`: returns the page
number just as it was configured with `\setuppagenumbering` and with
`\setupuserpagenumber`.

- `\pagenumber`: returns the same number
as the previous command but still in Arabic numbers.

- `\realpagenumber`: returns the real
number of the page in Arabic numbers without taking any of these
specifications into account.

To get the number of the final page in the document there are three
commands that are parallel to the previous ones. They are:
`\lastuserpagenumber`,`\lastpagenumber`
and `\lastrealpagenumber`.

## Forced or suggested page breaks

### The `\page` command

The algorithm for text distribution in ConTeXt is quite complex, and
is based on a multitude of calculations and internal variables that tell
the program where the best possible point is for introducing an actual
page break from the perspective of typographical correctness. The
`\page` command allows us to influence this algorithm:

- By suggesting certain points as the best or the most inappropriate
place for including a page break.

  - **`no`**: indicates that the place where the command is
    located is not a good candidate for inserting a page break, so, as
    far as possible, the break should be made at another point in the
    document.
    
  - **`preference`**: tells ConTeXt that the point where it
  encounters the command is a *good place* for attempting a page
  break, although it will not force one there.

  - **`bigpreference`**: indicates that the point where it
  encounters the command is a *very good place* for attempting a
  page break, but it too does not go as far as forcing it.

  Note that these three options neither force nor prevent page breaks,
  but only tell ConTeXt that when looking for the best place for a
  page break, it should take into account what is indicated in this
  command. In the final instance, however, the place where the page
  break will  happen will continue to be decided by ConTeXt.

- By forcing a page break at a certain point; in this case we can
also indicate how many page breaks should be made as well as certain
features of the pages to be inserted.

  - **`yes`**: force a page break at this point.

  - **`makeup`**: similar to `yes`, but the forced break is
  immediate, without first placing any floating objects whose placement
  is pending (see  \in{section}[sec:floating objects]).

  - **`empty`**: insert a completely blank page in the document.
    
  - **`even`**: insert as many pages as necessary to make the
    next page an even page.
    
  - **`odd`**: insert as many pages as necessary to make the next
    page an odd page.
    
  - **`left, right`**: similar to the two previous options, but
    applicable only to double-sided printed documents, with different
    headers, footers or margins depending on whether the page is odd or
    even.
    
  - **`quadruple`**: insert the number of pages needed for the
    next page to be a multiple of 4.

Along with these options which specifically control pagination,
`\page` includes other options that affect the way this command
functions. Especially the `disable` option that causes ConTeXt
to ignore the `\page` commands it finds from there on, and the
`reset` option that produces the opposite effect, restoring the
effectiveness of future `\page` commands.

### Joining certain lines or paragraphs to prevent a page break from being inserted between them

Sometimes, if we want to prevent a page break between several
paragraphs, the use of the `\page` command can be laborious, as it
would have to be written at every point where it was possible for a page
break to be inserted. A simpler procedure for this is to place the
material we want to keep on the same page in what TeX calls a  *vertical box*.

!!! note ""
    
    At the beginning of this document (on \at{page}[ref:boxes]) I
    indicated that internally, everything is a *box* for TeX. The box
    notion is fundamental in TeX for any kind of *advanced*
    operation; but managing it is too complex to include in this
    introduction. This is why I only make occasional references to boxes.
    


TeX boxes, once created, are indivisible, meaning that we cannot
insert a page break that would split a box in two. This is why, if we
put the material we want kept together in an invisible box, we avoid a
page break being inserted that would split this material. The command
for doing this is `\vbox`, the syntax for which is

`\vbox{Material}`

where *Material* is the text we want to keep together.

Some of ConTeXt's environments do put their contents in a box. For
example, `framedtext`, so if we frame the material we want kept
together in this environment and also see that the frame is invisible
(which we do with the `frame=off` option), we will have achieved the
same thing.

# Headers and footers

### Commands for establishing the content of headers and footers

If we have assigned a certain size to the header and footer in page
layout, we can include text in them with the `\setupheadertexts` and
`\setupfootertexts` commands. The two commands are similar, the only
difference being that the former activates header content and the latter
the footer content. Both have from one to five arguments.

- Used with a single argument this will contain the text of the
header or footer that will be placed in the centre of the page. For
example: `\setupfootertexts[pagenumber]` will write the page number
at the centre of the footer.

- Used with two arguments, the content of the first argument will be
placed on the left side of the header or footer, and that of the second
argument on the right side. For example
`\setupheadertexts[Preface][pagenumber]` will typeset a page header
in which the word “preface” is written on the left side and
the page number is printed on the right side.

- If we use three arguments, the first will indicate *the area*
in which the other two are to be printed. By *area* I am referring
to the *areas* of the page mentioned in
\in{section}[sec:page-elements], in other words: edge, margin, header…
The other two arguments contain the text to be placed in the left edge,
margin and right edge, margin.

Using it with four or five arguments is equivalent to using it with two
or three arguments, in cases where a distinction is made between even
and odd pages, which occurs, as we know, when
`alternative=doublesided` with `\setuppagenumbering` has been
set.  In this case, two possible arguments are added to reflect the
content of the left and right sides of the even pages.

An important characteristic of these two commands is that when they are
used with two arguments, the previous central header or footer (if it
existed) is not rewritten, which allows us to write a different text in
each area as long as we first write the central text (calling the
command with a single argument) and then write the texts for either side
(calling it again, now with two arguments). So, for example, if we write
the following commands

```
\setupheadertexts[and]
\setupheadertexts[Tweedledum][Tweedledee]
```

The first command will write “and” in the centre of the header
and the second will write “Tweedledum” on the left and
“Tweedledee” on the right, leaving the centre area untouched,
since it has not been ordered to be rewritten. The resulting header will
now show up as

<!-- \color[maincolor] {Tweedledum\hfill and\hfill Tweedledee} -->
<!--tex(
\setupheadertexts[and]
\setupheadertexts[Tweedledum][Tweedledee]
...TODO
)tex-->![img](../../img/spinner.png)

!!! note ""
    
    The explanation I have just given of the operation of these commands
    is my conclusion after many tests. The explanation of these commands
    provided in ConTeXt *excursion* is based on the version with
    five arguments; and the one in the 2013 reference manual is based on
    the version with three arguments. I think mine is clearer.
    On the other hand, I have not seen an explanation of why the second
    command call does not overwrite the previous call, but this is how it
    works if we first write the central item in the header or footer and
    then the ones either side. But if we write the items either side first
    in the header/footer, the subsequent call to the command to write the
    central item will delete the previous headers or footers. Why? I have
    no idea. I think these small details introduce unnecessary
    complication and should be clearly explained in the official
    documentation.

Moreover, we can indicate any combination of text and commands as the
actual content of the header or footer. But also the following values:

- **`date, currentdate`**: will write (either of them) the
current date.

- **`pagenumber`**: will write the page number.

- **`part, chapter, section…`**: will write the title
corresponding to part, chapter, section… or whatever structural
division there is.

- **`partnumber, chapternumber, sectionnumber…`**: will write
the number of the part, chapter, section… or whatever structural
division there is.

  **Attention**: These symbolic names (`date, currentdate, pagenumber, chapter, chapternumber`, etc.) are only interpreted as
  such if the symbolic name itself is the only content of the argument;
  but if we add some other text or formatting command, these words will
  be interpreted literally, and so, for example, if we write
  `\setupheadertexts[chapternumber]` we will get the number of the
  current chapter; but if we write `\setupheadertexts[{Chapter chapternumber}]` we will end up with:
  “Chapter&nbsp;chapternumber”. In these cases, when the content of
  the command is not just the symbolic word, we must:

  - For `date, currentdate` and `pagenumber` use, not the
  symbolic word but the command with the same name (`\date`,
  `\currentdate` or `\pagenumber`).

  - For `part, partnumber, chapter, chapternumber`, etc. use the
  `\getmarking[Mark]` command that returns the
  contents of the *Mark* that is asked for. So, for example,
  `\getmarking[chapter]` will return the title of the current
  chapter, while `\getmarking[chapternumber]` will return the number
  of the current chapter.

  To disable headers and footers on a particular page, use the
  `\noheaderandfooterlines`
  command that acts exclusively on the page where it is located. If we
  only want to delete the page number on a particular page, we must use
  the `\page[blank]` command.

### Formatting headers and footers

The specific format in which the text of the header or footer is shown
can be indicated in the arguments for `\setupheadertexts` or
`\setupfootertexts` by using the corresponding format commands.
However, we can also configure this globally with `\setupheader` and
`\setupfooter` that allow the following options:

- **`state`**: allows for the following values: `start, stop,
  empty, high, none, normal` or `nomarking`.
  
- **`style, leftstyle, rightstyle`**: configuration of the header
  and footer text style. `style` affects all pages, `leftstyle`
  the even pages and `rightstyle` the odd pages.
  
- **`color, leftcolor, rightcolor`**: header or footer colour. It
  can affect all pages (`color` option) or only the even pages (`leftcolor`) or odd pages (`rightcolor`)
  
- **`width, leftwidth, rightwidth`**: width of all headers and
footers (`width`) or headers/footers on even pages (`leftwidth`)
or odd ones (`rightwidth`).

- **`before`**: command to be executed before writing the header
or footer.

- **`after`**: command to be executed after writing the header or
footer.

- **`strut`**: if “yes”, a vertical separation space is
  established between the header and the edge. When it is
  “no”, the header or footer runs up against the edges of the
  upper or lower edge areas.
  
### Defining specific headers and footers and linking them to section commands

ConTeXt's header and footer system allows us to automatically change
the text in the header or footer when we change chapters or sections; or
when we change pages, if we have set different headers or footers for
odd and even pages. But what it does not allow is to differentiate
between the first page (of the document, or of a chapter or section) and
the rest of the pages. To achieve the latter we must:

- Define a specific header or footer.
- Link it to the section it applies to.

The definition of specific headers or footers is done with the
`\definetext` command, whose syntax is:

```tex
\definetext
  [Name] [Type]
  [Content1] [Content2] [Content3]
  [Content4] [Content5]
```

where *Name* is the name assigned to the header or footer we are
dealing with; *Type* can be `header` or `footer`, depending
on which of the two we are defining, and the remaining five arguments
contain the contents we want for the new header or footer, in a similar
way to how we have seen
`\setupheadertexts` and
`\setupfootertexts` function. Once we
have done this, we need to link the new header or footer to some
particular section with `\setuphead` by using the *header* and
`footer` options (that are not explained in
\in{Chapter}[cap:structure]).

Thus, the following example will hide the header on the first page of
each chapter and a centred page number will appear as the footer:

```tex
\definetext[ChapterFirstPage] [footer] [pagenumber]
\setuphead 
  [chapter]
  [header=high, footer=ChapterFirstPage]
```

## Inserting text elements in page edges and margins

The top and bottom edges and the right and left margins usually do not
contain text of any kind. However, ConTeXt allows some text elements
to be placed there. In particular, the following commands are available
for this purpose:

- `\setuptoptexts`: allows us to place
text at the top edge of the page (above the header area).

- `\setupbottomtexts`: allows us to
place text at the bottom edge of the page (below the footer area).

- `\margintext`,
  `\atleftmargin`,
  `\atrightmargin`,
  `\ininner`,
  `\ininneredge`,
  `\ininnermargin`,
  `\inleft`,
  `\inleftedge`,
  `\inleftmargin`,
  `\inmargin`, `\inother`,
  `\inouter`,
  `\inouteredge`,
  `\inoutermargin`,
  `\inright`,
  `\inrightedge`,
  `\inrightmargin`: allow us to place text
  in the side edges and margins of the document.

The first two commands function exactly like `\setupheadertexts` and
`\setupfootertexts`, and the format of these texts can even be
configured in advance with `\setuptop` and `\setupbottom` similar
to how `\setupheader` allows us to configure the texts for
`\setupheadertexts`. For all this I refer to what I have already said
in \in{section}[sec:headerfooter]. The only little detail that needs to
be added is that the text set up for `\setuptoptexts` or
`\setupbottomtexts` will not be visible if no space has been reserved
in the page layout for the  upper (`top`) or lower (`bottom`)
edges. For this, see \in{section}[sec:setuplayout].

As for the commands aimed at placing text in the margins of the
document, they all have a similar syntax:

`\CommandName[Reference][Configuration]{Text}`

where *Reference* and *Configuration* are optional arguments;
the first is used for possible cross-referencing and the second allows
us to set up the marginal text. The last argument, enclosed in curly
brackets, contains the text to be placed in the margin.

Of these commands, the more general one is `\margintext` as it allows
text to be placed in any of the margins or side edges of the page. The
remaining commands, as their name indicates, place the text in the
margin itself  (right or left, inner or outer), or the edge (right or
left, inner or outer). These commands are closely related to page layout
because if, for example, we use `\inrightedge` but have not reserved
any space in the page layout for the right edge, nothing will be seen.

The configuration options for `\margintext` are as follows:

- **`location`**: indicates what margin the text will be placed
in. It can be `left`, `right` or, in double-sided documents,
`outer` or `inner`. By default it is `left` in single-sided
documents and `outer` in double-sided ones.

- **`width`**: width available for printing the text. By default,
the full width of the margin will be used.

- **`margin`**: indicates whether the text will be placed in the
`margin` itself or in the `edge`.

- **`align`**: text alignment. The same values are used here as
in \in{`\setupalign`}[sec:setupalign].

- **`line`**: allows us to indicate a number of lines of
displacement of the text in the margin. So, `line=1` will displace
the text by one line below and `line=-1` by one line above.

- **`style`**: command or commands for indicating the style of
text to be placed in the margins.

- **`color`**: the colour of marginal text.

- **`command`**: name of a command to which the text to be placed
in the margin will be passed as an argument. This command will be
executed before writing the text. For example, if we want to draw a
frame around the text, we could use “`[command=\framed]\{Text\}`”.

The remaining commands allow the same options, except for `location`
and `margin`. In particular, the `\atrightmargin` and
`\atleftmargin` commands place the text completely attached to the
body of the page. We can establish a separation space with the `distance` option, which I did not mention when talking about
`\margintext` because I saw no effect on that command in my tests.

!!! note ""
    
    In addition to the above options, these commands also support  other
    options (`strut, anchor, method, category, scope, option,
    hoffset, voffset, dy, bottomspace, threshold and stack`) that I have
    not  mentioned because they are not documented and frankly, I
    am not very sure what they are for. Ones with names like *distance* we can guess, but the rest? The wiki only mentions the `stack` option, saying that it is used to emulate the `\marginpars`
    command in LaTeX, but this does not seem very clear to me.

The `\setupmargindata` command allows us
to globally configure the texts in each margin. So, for example,

`\setupmargindata[right][style=slanted]`

will ensure that all texts in the right margin are written in slanted
style. 

We can also create our own customised command with

`\definemargindata[Name][Configuration]`

[^1]: Recall that in
\in{section}[sec:syntax] I indicated that the options taken by ConTeXt
commands are basically of two kinds: symbolic names, whose meaning is
already known to ConTeXt, or variable that we must explicitly assign
some value to.