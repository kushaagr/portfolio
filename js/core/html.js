export function html(strings, ...values) {
    return strings.reduce(
        (result, string, index) =>
            result + string + (values[index] ?? ""),
        ""
    );
}