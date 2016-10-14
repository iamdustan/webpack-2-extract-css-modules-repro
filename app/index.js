
import styles from './styles.css';
import dirStyles from './dir/styles.css';

console.log('-----load-----');
console.log(styles);
console.log(dirStyles);

document.body.innerHTML = `
  <div class=${styles.base}>
    <h1 class=${styles.header}>
      Title Page
    </h1>
    <div class=${dirStyles.base}>
      <p class=${styles.paragraph}>
        I am a paragraph. A beautifully composed, delightfully presented paragraph.
      </p>
    </div>
  </div>
`;
