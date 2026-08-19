class BankAccount{

    String AccountNumber;
    double balance;

        BankAccount(String AccountNumber,double balance)
        {

        this.AccountNumber = AccountNumber;
        this.balance = balance;

        }
    double getBalance() 
    {
        return balance;

     }   


    void setBalance(double newBalance)
    {
        if(newBalance>0)this.balance = newBalance;
    }
    void deposit(double amount){

        if(amount > 0)this.balance += amount;
    }
    void withdraw(double amount){

         if(amount> 0&& amount <= balance)this.balance -= amount;
    }
    public static void main(String[] args) 
    {
         BankAccount b = new BankAccount("101",20000000);
        b.withdraw(1000000);

        System.out.println(b.getBalance());
    }
}

