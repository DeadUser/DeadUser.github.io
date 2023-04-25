function lockTextboxes(scope) {

    document.querySelectorAll("input[type='text']")
        .forEach(input => {
            const label = document.createElement("label");
            label.textContent = input.value;
            label.setAttribute("class", "ml-2");
            input.parentNode.replaceChild(label, input);
        });

    scope.style.display = "none";
}
