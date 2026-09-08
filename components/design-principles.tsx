const principles = [
  'Innovative',
  'Useful',
  'Aesthetic',
  'Understandable',
  'Unobtrusive',
  'Honest',
  'Long-lasting',
  'Thorough',
  'Environmentally friendly',
  'Little design',
] as const;

export function DesignPrinciples() {
  return (
    <section
      id="principles"
      className="home-section home-section--principles design-principles"
      aria-labelledby="design-principles-title"
    >
      <div className="design-principles__layout">
        <h2 id="design-principles-title">Good design is</h2>

        <ul className="design-principles__list">
          {principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
