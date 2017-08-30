# Use Guide

## Quick use:

### Build

```
  # docker build -t docs_tool .
```

### Run

```
  # docker run -it --rm -d docs_tool
```

Volume to storage data is /mkdocs/data
If run with specify a volume data

```
  # docker run -it --rm -d -v "$(pwd)/data:/mkdocs/data" docs_tool
```

### If use with serve and port running

```
  # docker build --rm -t docs_tool . \
    ; docker stop docs_tool && docker container rm docs_tool \
    ; docker run -it -d -p 8002:8002 --name docs_tool --restart="on-failure" docs_tool
```

### If run one time and see processing
```
  # docker build --rm -t docs_tool . \
    ; docker stop docs_tool && docker container rm docs_tool \
    ; docker run -it --rm -p 8002:8002 --name docs_tool docs_tool  
```

### If only run single app
```
  # docker run -it --rm -d --name docs_tool docs_tool
```

### If only run and rebuild
```
  # docker run -it --rm -d -e RE_BUILD="https://github.com/Magestore/Docs-tool.git" docs_tool
```

## Theme User Guide
- Read document https://realpython.com/blog/python/primer-on-jinja-templating/
- http://jinja.pocoo.org/docs/2.9/templates/#list-of-control-structures

## Clear old image and container

```
  # docker stop docs_tool && docker container rm docs_tool
```

## Setup mkdocs

On github repository https://github.com/Magestore/Docs
When run the command mkdocs gh-deploy, Mkdocs will push automatically to gh-pages branch.
To settup it. Go to Settings > GitHub Pages > Source choose gh-pages branch on dropdown and save. After that go to
domain manage to setup dns point to github dns.
