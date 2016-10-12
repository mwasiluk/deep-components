function alasql_QUERY (data, fields, filters, aggregators, orders) {
    if(fields && fields.length == 0)
        return [];

    return alasql(alasql_QUERY_string(fields, filters, aggregators, orders), [data]);
}

function alasql_QUERY_string (fields, filters, aggregators, orders) {

    if(fields) {
        var _fields = _addParenthesis(fields);
        var select = _alasql_SELECT(_fields);
    }

    var where = "";
    if(filters && filters.length) {
        var _filters = _copy(filters);
        where = _alasql_WHERE(_filters);
    }

    var orderBy = "";
    if(orders && orders.length) {
        var _orders = _copy(orders);
        orderBy = _alasql_ORDERBY(_orders);
    }

    var groupBy = "";
    if(aggregators && aggregators.length) {
        var _aggregators = _copy(aggregators);
        groupBy = _alasql_GROUPBY(_aggregators);
        select = groupBy[0];
        groupBy = groupBy[1];
    }

    var query = select + " FROM ?" + where + " " + groupBy + " " + orderBy;

    return query;
}

function _alasql_SELECT (fields) {

    var select = "SELECT ";

    if(fields[0] == "*")
        return select += "*";

    for (var i = 0; i < fields.length; i++)
        select += fields[i] + ", ";
    return select.slice(0, -2);
}

function _alasql_WHERE (filters) {
    //var logicalOperator;
    //
    ///*DEPRECATED*/if(filters[0].logicalOperator == undefined) {
    //    logicalOperator = "AND"
    //}
    //else {
    //    logicalOperator = filters[0].logicalOperator;
    //    filters = filters.slice(1);
    //}

    var where = " WHERE ";
    var logicalOperator = filters[0].logicalOperator;
    filters = filters.slice(1);

    for (var i=0; i < filters.length; i++) {
        filters[i]["field"] = _normalizeField(filters[i]["field"]);
        if(filters[i]["value"] == "")
            filters[i]["value"] = "\"" + filters[i]["value"] + "\"";
    }

    for (var i=0; i < filters.length; i++) {
        if(filters[i]["operation"] == "contains")
            where += filters[i]["field"] + " like '%" + filters[i]["value"] + "%' " + logicalOperator + " ";
        else if(filters[i]["operation"] == "notContains")
            where += filters[i]["field"] + " not like '%" + filters[i]["value"] + "%' " + logicalOperator + " ";
        else if(filters[i]["operation"] == "start")
            where += filters[i]["field"] + " like '" + filters[i]["value"] + "%' " + logicalOperator + " ";
        else if(filters[i]["operation"] == "ends")
            where += filters[i]["field"] + " like '%" + filters[i]["value"] + "' " + logicalOperator + " ";
        else
            where += filters[i]["field"] + " " + filters[i]["operation"] + " " + filters[i]["value"] + " " + logicalOperator + " ";
    }

    return where.slice(0, -4);
}

function _alasql_GROUPBY (aggregators) {
    for (var i=0; i < aggregators.length; i++)
        aggregators[i]["field"] = _normalizeField(aggregators[i]["field"]);

    var select = "SELECT ";
    var groupBy = "GROUP BY ";

    for (var i = 0; i < aggregators.length; i++) {
        if(aggregators[i]["operation"] == "GROUP BY") {
            select += aggregators[i]["field"] + ", ";
            groupBy += aggregators[i]["field"] + ", ";
        }
        else
            //select += aggregators[i]["operation"] + "(" + aggregators[i]["field"] + ") as " + aggregators[i]["field"] + ", ";
            select += aggregators[i]["operation"] + "(" + aggregators[i]["field"] + "), ";
    }

    return [select.slice(0, -2), groupBy.slice(0, -2)];
}

function _alasql_ORDERBY (orders) {
    for (var i=0; i < orders.length; i++)
        orders[i]["field"] = _normalizeField(orders[i]["field"]);

    var orderBy = "ORDER BY ";

    for (var i = 0; i < orders.length; i++)
        orderBy += orders[i]["field"] + " " + orders[i]["operation"] + ", ";

    return orderBy.slice(0, -2);
}

function _addParenthesis (fields) {
    var result = [];

    for (var i=0; i < fields.length; i++)
        result.push(_normalizeField(fields[i]));

    return result;
}

function _normalizeField (field) {
    return "`" + field + "`";
    //return "[" + field + "]";
}

function alasql_transformData (data, fields, round) {
    if(!data || data.length == 0)
        return [];

    var tData = [];

    for (var i in fields){

        var field = fields[i];
        var values = [];

        for (var j in data) {
            var v = data[j][field];
            if(round)
                if(!isNaN(v) && v % 1 != 0)
                    v = Math.round(v * 1000000) / 1000000;
            values.push(v);
        }

        tData.push({
            name: field,
            data: values
        });
    }

    return tData;
};

function _copy (o) {
    var out, v, key;
    out = Array.isArray(o) ? new Array(o.length) : {};
    for (key in o) {
        v = o[key];
        out[key] = (typeof v === "object") ? this._copy(v) : v;
    }
    return out;
}