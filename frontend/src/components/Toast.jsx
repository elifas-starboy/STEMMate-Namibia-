// Always in the page so screen readers announce the text when it changes.
export default function Toast({ message, visible }) {
  return (
    <div className={visible ? "toast show" : "toast"} role="status" aria-live="polite">
      {message}
    </div>
  );
}
