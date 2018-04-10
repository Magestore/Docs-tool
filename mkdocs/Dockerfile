FROM python:3.5

LABEL maintainer "Robert <mrthinlt@gmail.com>"

ENV GITHUB_TOKEN 4fcf1cd7028a3d54b784d277939ba4dd5be8541e

# install app
RUN apt-get update && apt-get install -y --no-install-recommends \
      sudo \
      curl \
      git \
      cron \
      vim \
      rsync

#RUN apt-get install -y sudo

RUN mkdir -p /mkdocs
RUN mkdir -p /mkdocs/data

VOLUME ["/mkdocs/data"]

# Copy source over and create configs dir
COPY . /mkdocs/

WORKDIR /mkdocs


# Install Mkdocs http://www.mkdocs.org/#installation
RUN python get-pip.py
RUN pip install --upgrade pip
RUN pip install mkdocs
RUN mkdocs --version

# Install cronjob
#RUN echo "* * * * *     root      cd /mkdocs/app/ && /bin/sh ./mkdocs_build.sh 2>&1 1>>/mkdocs/cron.log &" >> /etc/crontab
#RUN echo "* * * * *     root      /bin/sh /mkdocs/update_docs.sh 2>&1 1>>/mkdocs/cron.log &" >> /etc/crontab
#RUN service cron start

ENV PORT=8002

EXPOSE $PORT

CMD ["/bin/sh", "app.sh"]