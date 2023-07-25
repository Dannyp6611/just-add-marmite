"use client";

import Link from "next/link";
import styles from "./notfound.module.css";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <h2>Ooops! That page cannot be found 😣</h2>
      <p>
        Redirecting to <Link href="/">Homepage</Link> for more marmite
        goodness...
      </p>
    </div>
  );
};

export default NotFoundPage;
