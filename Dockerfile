FROM python:3.6

LABEL maintainer "Robert <mrthinlt@gmail.com>"

# install app
RUN apt-get update && apt-get install -y --no-install-recommends \
      curl \
      git \
      cron \
      vim \
      rsync

#RUN apt-get install -y sudo

RUN mkdir -p /mkdocs

# Copy source over and create configs dir
COPY . /mkdocs/

WORKDIR /mkdocs


# Install Mkdocs http://www.mkdocs.org/#installation
RUN python get-pip.py
RUN pip install --upgrade pip
RUN pip install mkdocs
RUN mkdocs --version

# Install cronjob
#RUN echo "* * * * *     root      cd /mkdocs/app/ && /bin/sh ./mkdocs_build.sh 2>&1 1>/dev/null" >> /etc/crontab
RUN echo "* * * * *     root      cd /mkdocs/app/ && /bin/sh ./mkdocs_build.sh 2>&1 1>/mkdocs/cron.log" >> /etc/crontab
RUN service cron start

ENV PORT=8002

EXPOSE $PORT

CMD ["/bin/sh", "app.sh"]
