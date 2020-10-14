let row1 = '';
let row2 = '';


document.write("<table id=\"main\"><tbody><tr class=\"mainRow\">");
for (let i = 1; i < 6; i++) {
    document.write("<td><table id=\"t" + i + "\"><td colspan=\"2\"><strong>Produtos de " + i + "</strong></td><tbody>");
    for (let j = 1; j < 11; j++) {
        document.write("<tr><td>" + i + "x" + j + "</td><td>" + (i * j) + "</td><tr>");
    }
    document.write("</tbody></table></td>");
}
document.write("</tr><tr class=\"mainRow\">");

for (let i = 6; i < 11; i++) {
    document.write("<td><table id=\"t" + i + "\"><td colspan=\"2\"><strong>Produtos de " + i + "</strong></td><tbody>");
    for (let j = 1; j < 11; j++) {
        document.write("<tr><td>" + i + "x" + j + "</td><td>" + (i * j) + "</td><tr>");
    }
    document.write("</tbody></table></td>");
}

document.write("</td></tr></tbody></table>");
