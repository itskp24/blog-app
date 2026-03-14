import styles from '@/styles/Article/ArticleBody.module.css';

export default function ArticleBody({ body, blockquote }) {
  const insertAt = 4;

  return (
    <div className={styles.body}>
      {body.map((paragraph, index) => (
        <div key={index}>
          <p className={styles.body__paragraph}>{paragraph}</p>
          {blockquote && index === insertAt - 1 && (
            <blockquote className={styles.body__blockquote}>
              <p>{blockquote}</p>
            </blockquote>
          )}
        </div>
      ))}
    </div>
  );
}
