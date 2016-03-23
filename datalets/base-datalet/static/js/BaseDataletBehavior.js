/*
@license
    The MIT License (MIT)

    Copyright (c) 2015 Dipartimento di Informatica - Universit� di Salerno - Italy

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

/**
 * Developed by :
 * ROUTE-TO-PA Project - grant No 645860. - www.routetopa.eu
 *
*/

var BaseDataletBehavior ={

    properties: {

        /**
         * It represent the dataset api url
         *
         * @attribute dataUrl
         * @type string
         * @default 'null'
         */
        dataUrl: {
            type: String,
            value: ""
        },

        /**
         * It represents one or multiple fields selected by user
         *
         * @attribute fields
         * @type Array
         * @default empty
         */
        fields: {
            type: String,
            value: ""
        },

        /**
         * The selected and transformed data you can use in presentation phase
         *
         * @attribute data
         * @type Array
         * @default empty
         */
        data: {
            type: Array,
            value: []
        },
        title: {
            type: String,
            value: ""
        },
        description: {
            type: String,
            value: ""
        }

    },

    //factoryImpl: function(data_url, fields) {
    //    this.dataUrl = data_url;
    //    this.fields   = fields;
    //},

    //setParameters: function(params)
    //{
    //    this.title = params['title'];
    //    this.description = params['description'];
    //}

};