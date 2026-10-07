// Hidden test controls (Ctrl+Shift+E). They let an evaluator force failures.
export default function EvaluatorPanel({ failNextSync, onFailNextSyncChange, failNextSave, onFailNextSaveChange, onReopen }) {
  return (
    <section className="panel" aria-label="Evaluator controls">
      <b>Evaluator controls</b>
      <label>
        <input type="checkbox" checked={failNextSync} onChange={(e) => onFailNextSyncChange(e.target.checked)} /> Next sync fails
      </label>
      <label>
        <input type="checkbox" checked={failNextSave} onChange={(e) => onFailNextSaveChange(e.target.checked)} /> Next offline save fails (storage full)
      </label>
      <button type="button" onClick={onReopen}>
        Simulate app closing and reopening
      </button>
      <p className="hint">Press Ctrl+Shift+E to hide.</p>
    </section>
  );
}
