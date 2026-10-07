// "#main" links would break hash routing, so we move focus with code instead.
export default function SkipLink({ targetId = "main" }) {
  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById(targetId)?.focus();
  };
  return (
    <a className="skip" href={`#${targetId}`} onClick={handleClick}>
      Skip to main content
    </a>
  );
}
