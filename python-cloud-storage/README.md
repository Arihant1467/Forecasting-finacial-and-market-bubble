### How to Run Python scripts
We will use *Python-3* for our purpose



#### To Get started
```
make activate
make install-tools
```


#### Activate virtual env
```
make activate
```

#### Deactivate virtual env
```
make deactivate
```

#### To install packages
```
make install-tools
```

#### To install any tools inside Virtual Env
```
./bin/pip install package-name

```

### To upload csv to mongo
```
mongoimport -h ds041571.mlab.com:41571 -d team295 -c <collection> -u <user> -p <password> --file <csvfilepath> --type csv --headerline 
```


### Checkout [MakeFile](./MakeFile) for any commands

[How to Create Virtual Environment using Python](https://gist.github.com/pandafulmanda/730a9355e088a9970b18275cb9eadef3)