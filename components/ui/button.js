import Link from 'next/link';
import styles from './button.module.css';

export default function Button(props) {
  if (props.link) {
    // ! See README.md
    // to see notes about having <a> inside <Link>
    // for Next versions < Nextv13
    return (
      <Link href={props.link} className={styles.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
