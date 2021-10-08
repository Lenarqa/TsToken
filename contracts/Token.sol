pragma solidity ^0.8.0;

contract Token {
    string public name = "";
    string public symbol = "";
    uint256 private _totalSupply = 10000000000000000000000;
    uint8 public decimals = 18;

    address public owner;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    event Approval(address owner, address spender,uint256 amount);
    event Transfer(address owner, address spender,uint256 amount);

    constructor(string memory name_, string memory symbol_, address ownerAdress) {
        name = name_;
        symbol = symbol_;
        balances[msg.sender] = _totalSupply;
        owner = ownerAdress;
    }

    function balanceOf(address account) public view returns(uint256) {
        return balances[account];
    }

    function totalSupply() public view returns(uint256) {
        return _totalSupply;
    } 

    function transfer(address recipient, uint256 amount) public returns (bool success){ //recipient-получатель
        require(balances[msg.sender] >= amount, 'Error: Not enough AsuCoin');
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns(bool) {
        require(owner != address(0), "Error: Ownwer == address(0)");
        require(spender != address(0), "Error: Spender == address(0)");
        
        allowed[msg.sender][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

    function allowance(address currentOwner, address spender) public view returns (uint256) {
        return allowed[currentOwner][spender];
    }

    function transferFrom(address sender, address spender, uint256 amount) public returns(bool) {
        uint256 currentAllowance = allowed[sender][msg.sender]; 
        require(currentAllowance >= amount, "Transfer amount exceeds allowance");
        require(allowed[sender][spender] >= amount,'');
        allowed[sender][spender]-= amount;
        balances[msg.sender]-= amount;
        balances[spender]+= amount;
        
        return true;
    }
    
    function mint(address account, uint256 amount) external {
        balances[account]+= amount;
        _totalSupply+=amount;
    }

    function burn(address account, uint256 amount) external {
        require(balances[account]>=amount, "Error, we can,t burn more that you have in your balance");
        balances[account]-= amount;
        _totalSupply-=amount;
    }

    function increaseAllowance(address spender, uint256 addAmount) external returns (bool) {
        require(spender != address(0), "ERC20: approve to the zero address");
        approve(spender, allowed[msg.sender][spender]+addAmount);
        return true;
    }

    function decreaseAllowance(address spender, uint256 minusAmount) external returns (bool) {
        require(spender != address(0), "ERC20: approve to the zero address");
        approve(spender, allowed[msg.sender][spender] - minusAmount);
        return true;
    }
}