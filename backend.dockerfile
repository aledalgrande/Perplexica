FROM node:20-buster

ARG SEARXNG_API_URL
ENV SEARXNG_API_URL=${SEARXNG_API_URL}

WORKDIR /home/perplexica

COPY package.json /home/perplexica/
COPY yarn.lock /home/perplexica/

RUN yarn install

COPY src /home/perplexica/src
COPY tsconfig.json /home/perplexica/
COPY config.toml /home/perplexica/
COPY drizzle.config.ts /home/perplexica/

RUN mkdir /home/perplexica/data

RUN yarn build

CMD ["yarn", "start"]
