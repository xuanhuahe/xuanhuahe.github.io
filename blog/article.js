const prose = document.querySelector(".prose");
if (prose) {
  prose.querySelectorAll("table").forEach(table => {
    if (table.parentElement?.classList.contains("table-scroll")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role","region");
    wrapper.setAttribute("aria-label","Scrollable table");
    table.before(wrapper);
    wrapper.append(table);
  });
  if (typeof renderMathInElement === "function") {
    renderMathInElement(prose, {
      delimiters: [
        {left:"$$",right:"$$",display:true},
        {left:"\\[",right:"\\]",display:true},
        {left:"\\(",right:"\\)",display:false},
        {left:"$",right:"$",display:false}
      ],
      throwOnError:false
    });
  }
}
