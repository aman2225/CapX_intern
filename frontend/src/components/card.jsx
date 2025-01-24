// import React from "react";

const Card = () => {
  return (
    <>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 bg-gray-2">
            <SingleCard
              image="src\\assets\\image6.jpg"
              CardTitle="Start your journey toward a beautiful and functional website today"
              titleHref="/#"
              btnHref="/#"
              CardDescription="This inspires action, framing the templates as the first step toward a professional, user-friendly website."
              Button="View Details"
            />
            <SingleCard
              image="src\\assets\\image7.png"
              CardTitle="Learn how to grow your wealth with the right stock market strategies."
              CardDescription="This appeals to the user's desire for financial growth and actionable advice."
              Button="View Details"
            />
            <SingleCard
              image="src\\assets\\image8.jpg"
              CardTitle="The Art of Patience in Investing"
              CardDescription="Your success in investing will depend in part on your character and guts, and in part on your ability to realize that, at times, the best thing to do is nothing."
              Button="View Details"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden rounded-lg bg-gray-400 shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};