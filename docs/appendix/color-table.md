<link rel="stylesheet" href="../../css/color/color-table.css"/>
# Table of Color Names

<!-- TODO: use inline-blocks instead of table/td -->

## Crayola

See [colo-imp-crayola.mkiv](https://source.contextgarden.net/tex/context/base/mkiv/colo-imp-crayola.mkiv).
<table id="table_crayola" class="color-table">
<tr><td>loading ... </td></tr>
</table>

## RAL

See [colo-imp-ral.mkiv](https://source.contextgarden.net/tex/context/base/mkiv/colo-imp-ral.mkiv).
<table id="table_ral" class="color-table">
<tr><td>loading ... </td></tr>
</table>

## SVG

See [colo-imp-svg.mkiv](https://source.contextgarden.net/tex/context/base/mkiv/colo-imp-svg.mkiv).
<table id="table_svg" class="color-table">
<tr><td>loading ... </td></tr>
</table>

## X11

See [colo-imp-x11.mkiv](https://source.contextgarden.net/tex/context/base/mkiv/colo-imp-x11.mkiv).
<table id="table_x11" class="color-table">
<tr><td>loading ... </td></tr>
</table>

<script type="module">
import { create_table } from '../../js/color/gen-table.js';
import { crayola_colors } from '../../js/color/crayola-def.js';
import { ral_colors } from '../../js/color/ral-def.js'
import { svg_colors } from '../../js/color/svg-def.js'
import { x11_colors } from '../../js/color/x11-def.js'

create_table(table_crayola, crayola_colors, 6);
create_table(table_ral, ral_colors, 6);
create_table(table_svg, svg_colors, 6);
create_table(table_x11, x11_colors, 6);
</script>
