"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VersionedArray = function (_Array) {
    (0, _inherits3.default)(VersionedArray, _Array);

    function VersionedArray() {
        (0, _classCallCheck3.default)(this, VersionedArray);

        var _this = (0, _possibleConstructorReturn3.default)(this, (VersionedArray.__proto__ || (0, _getPrototypeOf2.default)(VersionedArray)).call(this));

        _this.commit = function () {
            _this.history.push(_this.slice());
        };

        _this.revert = function () {
            _this.splice.apply(_this, [0, _this.length].concat((0, _toConsumableArray3.default)(_this.history[_this.history.length - 1])));
        };

        _this.history = [[]];
        /*
         VA.commit is not a function
         这个错误 解决方案
         1 不行
         2 可行
         3 可行
         */
        //this.commit = this.commit.bind( this ); 这样不行  1

        //2
        /*
         this.commit = function(){
            this.history.push( this.slice() );
         }
         this.revert = function(){
            this.splice( 0, this.length, ...this.history[this.history.length-1] );
         }
        */

        return _this;
    }
    //3

    return VersionedArray;
}(Array);

var VA = new VersionedArray();
VA.push(1);
VA.push(2);
console.log("1 VA=" + VA);
console.log("1=[" + VA.history + "]");
VA.commit();
VA.push(3);
VA.commit();
console.log("2 VA=" + VA);
console.log("2=[" + VA.history + "]");
VA.revert();
console.log("3 VA=" + VA);
console.log("3=[" + VA.history + "]");