import fetch from "node-fetch";
import queryString from "query-string";
import { IResponse } from "src/Interfaces/response.interface";

export class Etherscan {
    private apiKey: string;
    private apiUrl: string;

    constructor(key: string) {
        this.apiUrl = "https://api.etherscan.io/api";
        this.apiKey = key;
        if (!this.apiKey) {
            throw new Error(`API key is required`);
        }
    }

    /* Accounts */
    public async getSingleEtherBalance(address: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getSingleEtherBalance Error: ${(err as any)?.message}`);
        }
    }

    public async getMultipleEtherBalance(addresses: string[]): Promise<IResponse> {
        try {
            if (addresses.length > 20) {
                throw new Error(`maxium of 20 accounts in a single batch`);
            }
            const url = `${this.apiUrl}?module=account&action=balancemulti&address=${addresses}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getMultipleEtherBalance Error: ${(err as any)?.message}`);
        }
    }

    public async getTrxList(address: string, startblock: number, endblock: number, page: number, offset: number, sort: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=account&action=txlist&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getTrxList Error: ${(err as any)?.message}`);
        }
    }

    public async getInternalTrxListByAddress(address: string, startblock: number, endblock: number, page: number, offset: number, sort: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=account&action=txlistinternal&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getInternalTrxListByAddress Error: ${(err as any)?.message}`);
        }
    }

    public async getInternalTrxListByHash(txHash: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=account&action=txlistinternal&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getInternalTrxListByHash Error: ${(err as any)?.message}`);
        }
    }

    public async getInternalTrxListByBlockRange(startblock: number, endblock: number, page: number, offset: number, sort: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=account&action=txlistinternal&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getInternalTrxListByBlockRange Error: ${(err as any)?.message}`);
        }
    }

    public async getERC20TokenTransferEventList({ contractAddress, address, page, offset, sort = "desc" }: { contractAddress: string | undefined, address: string, page: number, offset: number, sort: string }): Promise<IResponse> {
        const queryParams = { address, page, offset, sort, apikey: this.apiKey } as { [key: string]: any };
        contractAddress ? queryParams.contractaddress = contractAddress : null;
        const query = queryString.stringify(queryParams);

        try {
            const url = `${this.apiUrl}?module=account&action=tokentx&${query}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getERC20TokenTransferEventList Error: ${(err as any)?.message}`);
        }
    }

    public async getERC721TokenTransferEventList(contractAddress: string, address: string, page: number, offset: number, sort: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${address}&page=${page}&offset=${offset}&sort=${sort}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getERC721TokenTransferEventList Error: ${(err as any)?.message}`);
        }
    }

    public async getMinedBlocksByAddress(address: string, type: string, page: number, offset: number): Promise<IResponse> {
        try {
            if (type !== "blocks" && type !== "uncles") {
                throw new Error(`Wrong block type`);
            }
            const url = `${this.apiUrl}?module=account&action=getminedblocks&address=${address}&blocktype=${type}&page=${page}&offset=${offset}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getMinedBlocksByAddress Error: ${(err as any)?.message}`);
        }
    }

    /* Contracts */
    public async getContractAbi(address: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=contract&action=getabi&address=${address}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getContractAbi Error: ${(err as any)?.message}`);
        }
    }

    /* Transactions */
    public async checkContractExecutionStatus(txHash: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=transaction&action=getstatus&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`checkContractExecutionStatus Error: ${(err as any)?.message}`);
        }
    }

    public async checkTransactionReceiptStatus(txHash: string): Promise<IResponse> {
        // Only applicable for Post Byzantium fork transactions
        try {
            const url = `${this.apiUrl}?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`checkTransactionReceiptStatus Error: ${(err as any)?.message}`);
        }
    }

    /* Blocks */
    public async getBlockandUncleReward(blockNo: number): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=block&action=getblockreward&blockno=${blockNo}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getBlockandUncleReward Error: ${(err as any)?.message}`);
        }
    }

    public async getEstimatedBlockCountdownTime(blockNo: number): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=block&action=getblockcountdown&blockno=${blockNo}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getEstimatedBlockCountdownTime Error: ${(err as any)?.message}`);
        }
    }

    public async getBlockNumberByTimestamp(timestamp: number, closest: string): Promise<IResponse> {
        if (closest !== "before" && closest !== "after") {
            throw new Error(`Wrong parameter`);
        }
        try {
            const url = `${this.apiUrl}?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=${closest}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getBlockNumberByTimestamp Error: ${(err as any)?.message}`);
        }
    }

    /* Geth/Parity Proxy */
    public async getRecentBlockNumber(): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_blockNumber&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getRecentBlockNumber Error: ${(err as any)?.message}`);
        }
    }

    public async getBlockbyNumber(blockNumber: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getBlockbyNumber Error: ${(err as any)?.message}`);
        }
    }

    public async getUncleByBlockNumberAndIndex(blockNumber: string, index: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getUncleByBlockNumberAndIndex&tag=${blockNumber}&index=${index}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getUncleByBlockNumberAndIndex Error: ${(err as any)?.message}`);
        }
    }

    public async getBlockTransactionCountByNumber(blockNumber: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=${blockNumber}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getBlockTransactionCountByNumber Error: ${(err as any)?.message}`);
        }
    }

    public async getTransactionByHash(txHash: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getTransactionByHash Error: ${(err as any)?.message}`);
        }
    }

    public async getTransactionByBlockNumberAndIndex(blockNumber: string, index: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=${blockNumber}&index=${index}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getTransactionByBlockNumberAndIndex Error: ${(err as any)?.message}`);
        }
    }

    public async getTransactionCount(address: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getTransactionCount Error: ${(err as any)?.message}`);
        }
    }

    public async sendRawTransaction(): Promise<IResponse> {
        try {
            throw new Error(`Not Implemented`);
        } catch (err) {
            throw new Error(`sendRawTransaction Error: ${(err as any)?.message}`);
        }
    }

    public async getTransactionReceipt(txHash: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getTransactionReceipt Error: ${(err as any)?.message}`);
        }
    }

    public async call(): Promise<IResponse> {
        try {
            throw new Error(`Not Implemented`);
        } catch (err) {
            throw new Error(`call Error: ${(err as any)?.message}`);
        }
    }

    public async getCode(address: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getCode Error: ${(err as any)?.message}`);
        }
    }

    public async getStorageAt(address: string, position: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getStorageAt&address=${address}&position=${position}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getStorageAt Error: ${(err as any)?.message}`);
        }
    }

    public async gasPrice(address: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`gasPrice Error: ${(err as any)?.message}`);
        }
    }

    public async estimateGas(): Promise<IResponse> {
        try {
            throw new Error(`Not Implemented`);
        } catch (err) {
            throw new Error(`estimateGas Error: ${(err as any)?.message}`);
        }
    }

    /* Tokens */
    public async getERC20TokenTotalSupply(contractAddress: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getERC20TokenTotalSupply Error: ${(err as any)?.message}`);
        }
    }

    /* Tokens */
    public async getERC20TokenInfo(contractAddress: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=token&action=tokeninfo&contractaddress=${contractAddress}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getERC20TokenTotalSupply Error: ${(err as any)?.message}`);
        }
    }


    public async getERC20TokenBalance(contractAddress: string, address: string): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getERC20TokenBalance Error: ${(err as any)?.message}`);
        }
    }

    /* Gas Tracker */
    public async estimateConfirmationTime(gasPrice: number): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=gastracker&action=gasestimate&gasprice=${gasPrice}&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`estimateConfirmationTime Error: ${(err as any)?.message}`);
        }
    }

    public async getGasOracle(): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=gastracker&action=gasoracle&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getGasOracle Error: ${(err as any)?.message}`);
        }
    }

    /* Stats */
    public async getTotalEther(): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=stats&action=ethsupply&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getTotalEther Error: ${(err as any)?.message}`);
        }
    }

    public async getEtherLastPrice(): Promise<IResponse> {
        try {
            const url = `${this.apiUrl}?module=stats&action=ethprice&apikey=${this.apiKey}`;
            return this.wrapFetch(url);
        } catch (err) {
            throw new Error(`getEtherLastPrice Error: ${(err as any)?.message}`);
        }
    }

    /* Wrap */
    private async wrapFetch(url: string): Promise<IResponse> {
        try {
            const res = await fetch(url);
            const json = await res.json();
            if (json.status !== "1") {
                throw new Error(`Response status must to be '1'`);
            }
            return json;
        } catch (err) {
            throw new Error(`Failed to fetch: ${(err as any)?.message}`);
        }
    }
}
