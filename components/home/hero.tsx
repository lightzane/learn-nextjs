import Image from 'next/image';
import classes from './hero.module.css';

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="https://github.com/lightzane.png"
          alt="An image showing Next.js"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Lightzane</h1>
      <p>This is the paragraph content of this blog</p>
    </section>
  );
}
