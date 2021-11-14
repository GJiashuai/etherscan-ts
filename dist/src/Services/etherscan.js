"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etherscan = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const query_string_1 = __importDefault(require("query-string"));
class Etherscan {
    constructor(key) {
        this.apiUrl = "https://api.etherscan.io/api";
        this.apiKey = key;
        if (!this.apiKey) {
            throw new Error(`API key is required`);
        }
    }
    async getSingleEtherBalance(address) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getSingleEtherBalance Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getMultipleEtherBalance(addresses) {
        var _a;
        try {
            if (addresses.length > 20) {
                throw new Error(`maxium of 20 accounts in a single batch`);
            }
            const url = `${this.apiUrl}?module=account&action=balancemulti&address=${addresses}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getMultipleEtherBalance Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getTrxList(address, startblock, endblock, page, offset, sort) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=account&action=txlist&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getTrxList Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getInternalTrxListByAddress(address, startblock, endblock, page, offset, sort) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=account&action=txlistinternal&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getInternalTrxListByAddress Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getInternalTrxListByHash(txHash) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=account&action=txlistinternal&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getInternalTrxListByHash Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getInternalTrxListByBlockRange(startblock, endblock, page, offset, sort) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=account&action=txlistinternal&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getInternalTrxListByBlockRange Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getERC20TokenTransferEventList({ contractAddress, address, page, offset, sort = "desc" }) {
        var _a;
        const queryParams = { address, page, offset, sort, apikey: this.apiKey };
        contractAddress ? queryParams.contractaddress = contractAddress : null;
        const query = query_string_1.default.stringify(queryParams);
        try {
            const url = `${this.apiUrl}?module=account&action=tokentx&${query}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getERC20TokenTransferEventList Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getERC721TokenTransferEventList(contractAddress, address, page, offset, sort) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${address}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getERC721TokenTransferEventList Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getMinedBlocksByAddress(address, type, page, offset) {
        var _a;
        try {
            if (type !== "blocks" && type !== "uncles") {
                throw new Error(`Wrong block type`);
            }
            const url = `${this.apiUrl}?module=account&action=getminedblocks&address=${address}&blocktype=${type}&page=${page}&offset=${offset}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getMinedBlocksByAddress Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getContractAbi(address) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=contract&action=getabi&address=${address}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getContractAbi Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async checkContractExecutionStatus(txHash) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=transaction&action=getstatus&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`checkContractExecutionStatus Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async checkTransactionReceiptStatus(txHash) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`checkTransactionReceiptStatus Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getBlockandUncleReward(blockNo) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=block&action=getblockreward&blockno=${blockNo}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getBlockandUncleReward Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getEstimatedBlockCountdownTime(blockNo) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=block&action=getblockcountdown&blockno=${blockNo}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getEstimatedBlockCountdownTime Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getBlockNumberByTimestamp(timestamp, closest) {
        var _a;
        if (closest !== "before" && closest !== "after") {
            throw new Error(`Wrong parameter`);
        }
        try {
            const url = `${this.apiUrl}?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=${closest}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getBlockNumberByTimestamp Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getRecentBlockNumber() {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getRecentBlockNumber Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getBlockbyNumber(blockNumber) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getBlockbyNumber Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getUncleByBlockNumberAndIndex(blockNumber, index) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getUncleByBlockNumberAndIndex&tag=${blockNumber}&index=${index}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getUncleByBlockNumberAndIndex Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getBlockTransactionCountByNumber(blockNumber) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=${blockNumber}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getBlockTransactionCountByNumber Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getTransactionByHash(txHash) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getTransactionByHash Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getTransactionByBlockNumberAndIndex(blockNumber, index) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=${blockNumber}&index=${index}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getTransactionByBlockNumberAndIndex Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getTransactionCount(address) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getTransactionCount Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async sendRawTransaction() {
        var _a;
        try {
            throw new Error(`Not Implemented`);
        }
        catch (err) {
            throw new Error(`sendRawTransaction Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getTransactionReceipt(txHash) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getTransactionReceipt Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async call() {
        var _a;
        try {
            throw new Error(`Not Implemented`);
        }
        catch (err) {
            throw new Error(`call Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getCode(address) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getCode Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getStorageAt(address, position) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getStorageAt&address=${address}&position=${position}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getStorageAt Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async gasPrice(address) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`gasPrice Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async estimateGas() {
        var _a;
        try {
            throw new Error(`Not Implemented`);
        }
        catch (err) {
            throw new Error(`estimateGas Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getERC20TokenTotalSupply(contractAddress) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getERC20TokenTotalSupply Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getERC20TokenBalance(contractAddress, address) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getERC20TokenBalance Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async estimateConfirmationTime(gasPrice) {
        var _a;
        try {
            const url = `${this.apiUrl}?module=gastracker&action=gasestimate&gasprice=${gasPrice}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`estimateConfirmationTime Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getGasOracle() {
        var _a;
        try {
            const url = `${this.apiUrl}?module=gastracker&action=gasoracle&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getGasOracle Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getTotalEther() {
        var _a;
        try {
            const url = `${this.apiUrl}?module=stats&action=ethsupply&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getTotalEther Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async getEtherLastPrice() {
        var _a;
        try {
            const url = `${this.apiUrl}?module=stats&action=ethprice&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        }
        catch (err) {
            throw new Error(`getEtherLastPrice Error: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
    async wrapFetch(url) {
        var _a;
        try {
            const res = await (0, node_fetch_1.default)(url);
            const json = await res.json();
            if (json.status !== "1") {
                throw new Error(`Response status must to be '1'`);
            }
            return json;
        }
        catch (err) {
            throw new Error(`Failed to fetch: ${(_a = err) === null || _a === void 0 ? void 0 : _a.message}`);
        }
    }
}
exports.Etherscan = Etherscan;
//# sourceMappingURL=etherscan.js.map