try:
    from google.cloud import storage
    from pymongo import MongoClient
    from io import BytesIO
except Exception as e:
    print("Modules are missing {}".format(e))


class GCS:
 
    def __init__(self):
        
        # initializing connection to GoogleCloudStorage
        print("Initializing GCS client")
        self.bucket_id = "forecasting-market-bubble"
        creds_file =  "./auth-keys/Forecasting-Market-Bubble-29b6e7dd600d.json"
        gcsClient = storage.Client.from_service_account_json(creds_file)
        self.bucket = gcsClient.get_bucket(self.bucket_id)

        # initializing connection to MongoDB
        print("Initializing Mongo client")
        self.db_name = "team295"
        client = MongoClient("mongodb://cmpe295:cmpe295@ds041571.mlab.com:41571/team295")
        self.db=client[self.db_name]


    # This function uploads file to the Google Cloud Storage
    def uploadToBucket(self,filename="",imageName=""):
        blob = self.bucket.blob(imageName)
        
        with open(filename,'rb') as f:
            blob.upload_from_file(f)
        
        print("upload completed")
    
    # This function gets data from mongodb
    def getLandData(self):
        try:
            landData = self.db.landdata
            result = landData.find_one({"MSA": "ATLANTA"})
            return result
        except Exception as e:
            print("Exception in getting land data {}".format(e))
        
        return None



if __name__=="__main__":

    gcs = GCS()
    #gcs.uploadToBucket("./README.md","How-to-create-python-virtual-env.md")
    landData = gcs.getLandData()
    print(landData)

    


'''
client = storage.Client()
# https://console.cloud.google.com/storage/browser/[bucket-id]/
bucket = client.get_bucket('bucket-id-here')
# Then do other things...
blob = bucket.get_blob('remote/path/to/file.txt')
print(blob.download_as_string())
blob.upload_from_string('New contents!')
blob2 = bucket.blob('remote/path/storage.txt')
blob2.upload_from_filename(filename='/local/path.txt')
'''