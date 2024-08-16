#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 29 20:30:33 2024

@author: aaronmaciag_snhu
"""

from pymongo import MongoClient
from pymongo.errors import OperationFailure #import operation failure
from bson.objectid import ObjectId

class AnimalShelter(object):
    """ CRUD operations for Animal collection in MongoDB """

    def __init__(self, username, password):
        # Initializing the MongoClient. This helps to 
        # access the MongoDB databases and collections.
        # This is hard-wired to use the aac database, the 
        # animals collection, and the aac user.
        # Definitions of the connection string variables are
        # unique to the individual Apporto environment.
        #
        # You must edit the connection variables below to reflect
        # your own instance of MongoDB!
        #
        # Connection Variables
        #
        USER = username
        PASS = password
        HOST = 'nv-desktop-services.apporto.com'
        PORT = 32644
        DB = 'AAC'
        COL = 'animals'
        self.is_connected = False
        #
        # Initialize Connection
        #
        try:
            #self.client = MongoClient('mongodb://%s:%s@%s:%d' % (USER,PASS,HOST,PORT))
            self.client = MongoClient('mongodb://localhost:27017');
            self.client.admin.command('ismaster')#run admin command on server to ensure it is connected
            self.database = self.client['%s' % (DB)]
            self.collection = self.database['%s' % (COL)]
            self.is_connected = True#if no exception is thrown then set this variable to true
        except OperationFailure:
            self.is_connected = False#if connecion fails set variable to false

# Complete this create method to implement the C in CRUD.
    def create(self, data):
        
        if data is not None:
            
            try: #try block for inserting document
            
                self.database.animals.insert_one(data) # data should be dictionary   
                
                return True #return true if successful
            
            except OperationFailure:
                
                return False #return false if not inserted
        else:
            
            raise Exception("Nothing to save, because data parameter is empty")
            

# Create method to implement the R in CRUD.
    def read(self, query ={}):
        #make sure a dictionary is passed
      if not isinstance(query, dict):
          raise ValueError("The query must be a dictionary.")
          
      #query the database
      try:
          result = list(self.database.animals.find(query))#convert cursor to list
          return result
      except OperationFailure:
          raise Exception('Query failed')
            
        
#Create method to implement U in CRUD
    def updateOne(self, in_field, in_value, new_field, new_value):
        #save query values into one variable
        query ={in_field:in_value}
        #save new values into variable
        new_values = {"$set": {new_field:new_value}}
        try:
            #update one and store object in variable
            modified_object = self.database.animals.update_one(query,new_values)
            #return how many documents were updated
            return modified_object.modified_count
        except OperationFailure:
            raise Exception('Update one operation failed.')
    
    #Create update many functionality
    def updateMany(self, in_field, in_value,new_field, new_value):
        #set up query with in values
        query = {in_field:in_value}
        #set new values
        new_values = {"$set":{new_field:new_value}}
        try:
            #update documents and save in modified object
            modified_object = self.database.animals.update_many(query,new_values)
            #return modified documents count
            return modified_object.modified_count
        except OperationFailure:
            raise Exception('Update many operation failed.')
    
#create method to implement D in CRUD
    def deleteOne(self, in_field, in_value):
        #set query using in value and field
        query = {in_field: in_value}
        try:
            #delete document and save delete object in variable
            delete_object = self.database.animals.delete_one(query)
            #return number of documents deleted
            return delete_object.deleted_count
        except OperationFailure:
            raise Exception('Delete one operation failed.')
    
#create method to implement D many in CRUD
    def deleteMany(self, in_field, in_value):
        #set query using in value and field
        query = {in_field: in_value}
        try:
            #delete document and save delete object in variable
            delete_object = self.database.animals.delete_many(query)
            #return number of documents deleted
            return delete_object.deleted_count
        except OperationFailure:
            raise Exception('Delete many operation failed.')
            
   