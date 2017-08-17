FROM python:3.5

RUN apt-get update \
    && apt-get install -y --no-install-recommends git\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN git clone https://github.com/LucianoFromTrelew/Vimthon
EXPOSE 5000
CMD ["python", "Vimthon/run.py"]