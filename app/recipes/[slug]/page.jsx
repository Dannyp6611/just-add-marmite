import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import styles from "./page.module.css";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const generateStaticParams = async () => {
  const res = await client.getEntries({ content_type: "recipe" });
  const recipes = res.items;

  return recipes.map((recipe) => {
    return {
      slug: recipe.fields.slug,
    };
  });
};

const RecipeDetailsPage = async ({ params }) => {
  const { slug } = params;

  const res = await client.getEntries({
    content_type: "recipe",
    "fields.slug": slug,
  });

  const recipe = res.items[0];

  // destructure from recipe
  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;

  return (
    <div>
      <div className={styles.banner}>
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2 className={styles.heading}>{title}</h2>
      </div>

      <div className={styles.info}>
        <p>Takes about {cookingTime} mins to cook.</p>
        <h3 className={styles.heading}>Ingredients:</h3>
        {ingredients.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>

      <div className="method">
        <h3 className={styles.heading}>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
