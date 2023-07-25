import RecipeCard from "@/components/RecipeCard";
import { createClient } from "contentful";

import styles from "./page.module.css";

export default async function Recipes() {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });
  const res = await client.getEntries({ content_type: "recipe" });

  const recipes = res.items;

  console.log(recipes);

  return (
    <div className={styles.recipeList}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} {...recipe.fields} />
      ))}
    </div>
  );
}
