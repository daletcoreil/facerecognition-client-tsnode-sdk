export * from './cluster';
export * from './clusterCollection';
export * from './clusterFacesInput';
export * from './clusterFacesInputAllOf';
export * from './clusterFacesOutput';
export * from './clusterFacesOutputAllOf';
export * from './extractFacesInput';
export * from './extractFacesInputAllOf';
export * from './extractFacesOutput';
export * from './extractFacesOutputAllOf';
export * from './face';
export * from './faceBbox';
export * from './faceDetectedEntity';
export * from './faceExtractionCollection';
export * from './faceInCollectionInput';
export * from './faceInCollectionInputAllOf';
export * from './faceInCollectionOutput';
export * from './faceInCollectionOutputAllOf';
export * from './job';
export * from './jobInput';
export * from './jobMediatorInput';
export * from './jobMediatorStatus';
export * from './jobOutput';
export * from './jobType';
export * from './locator';
export * from './mediatorJob';
export * from './searchFacesInput';
export * from './searchFacesInputAllOf';
export * from './searchFacesOutput';
export * from './searchFacesOutputAllOf';
export * from './searchFacesOutputItem';
export * from './token';

import localVarRequest = require('request');

import { Cluster } from './cluster';
import { ClusterCollection } from './clusterCollection';
import { ClusterFacesInput } from './clusterFacesInput';
import { ClusterFacesInputAllOf } from './clusterFacesInputAllOf';
import { ClusterFacesOutput } from './clusterFacesOutput';
import { ClusterFacesOutputAllOf } from './clusterFacesOutputAllOf';
import { ExtractFacesInput } from './extractFacesInput';
import { ExtractFacesInputAllOf } from './extractFacesInputAllOf';
import { ExtractFacesOutput } from './extractFacesOutput';
import { ExtractFacesOutputAllOf } from './extractFacesOutputAllOf';
import { Face } from './face';
import { FaceBbox } from './faceBbox';
import { FaceDetectedEntity } from './faceDetectedEntity';
import { FaceExtractionCollection } from './faceExtractionCollection';
import { FaceInCollectionInput } from './faceInCollectionInput';
import { FaceInCollectionInputAllOf } from './faceInCollectionInputAllOf';
import { FaceInCollectionOutput } from './faceInCollectionOutput';
import { FaceInCollectionOutputAllOf } from './faceInCollectionOutputAllOf';
import { Job } from './job';
import { JobInput } from './jobInput';
import { JobMediatorInput } from './jobMediatorInput';
import { JobMediatorStatus } from './jobMediatorStatus';
import { JobOutput } from './jobOutput';
import { JobType } from './jobType';
import { Locator } from './locator';
import { MediatorJob } from './mediatorJob';
import { SearchFacesInput } from './searchFacesInput';
import { SearchFacesInputAllOf } from './searchFacesInputAllOf';
import { SearchFacesOutput } from './searchFacesOutput';
import { SearchFacesOutputAllOf } from './searchFacesOutputAllOf';
import { SearchFacesOutputItem } from './searchFacesOutputItem';
import { Token } from './token';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
        "ExtractFacesInput.EffortEnum": ExtractFacesInput.EffortEnum,
        "ExtractFacesInputAllOf.EffortEnum": ExtractFacesInputAllOf.EffortEnum,
        "Job.JobTypeEnum": Job.JobTypeEnum,
        "Job.JobProfileEnum": Job.JobProfileEnum,
        "JobMediatorStatus.StatusEnum": JobMediatorStatus.StatusEnum,
}

let typeMap: {[index: string]: any} = {
    "Cluster": Cluster,
    "ClusterCollection": ClusterCollection,
    "ClusterFacesInput": ClusterFacesInput,
    "ClusterFacesInputAllOf": ClusterFacesInputAllOf,
    "ClusterFacesOutput": ClusterFacesOutput,
    "ClusterFacesOutputAllOf": ClusterFacesOutputAllOf,
    "ExtractFacesInput": ExtractFacesInput,
    "ExtractFacesInputAllOf": ExtractFacesInputAllOf,
    "ExtractFacesOutput": ExtractFacesOutput,
    "ExtractFacesOutputAllOf": ExtractFacesOutputAllOf,
    "Face": Face,
    "FaceBbox": FaceBbox,
    "FaceDetectedEntity": FaceDetectedEntity,
    "FaceExtractionCollection": FaceExtractionCollection,
    "FaceInCollectionInput": FaceInCollectionInput,
    "FaceInCollectionInputAllOf": FaceInCollectionInputAllOf,
    "FaceInCollectionOutput": FaceInCollectionOutput,
    "FaceInCollectionOutputAllOf": FaceInCollectionOutputAllOf,
    "Job": Job,
    "JobInput": JobInput,
    "JobMediatorInput": JobMediatorInput,
    "JobMediatorStatus": JobMediatorStatus,
    "JobOutput": JobOutput,
    "JobType": JobType,
    "Locator": Locator,
    "MediatorJob": MediatorJob,
    "SearchFacesInput": SearchFacesInput,
    "SearchFacesInputAllOf": SearchFacesInputAllOf,
    "SearchFacesOutput": SearchFacesOutput,
    "SearchFacesOutputAllOf": SearchFacesOutputAllOf,
    "SearchFacesOutputItem": SearchFacesOutputItem,
    "Token": Token,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
