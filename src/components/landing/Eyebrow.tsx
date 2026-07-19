/** Section eyebrow — renders `( label )` in muted ink. Cheap visual system. */
export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[14px] tracking-wide text-[color:var(--ld-text-2)]">( {children} )</p>
);
