class InsufficientFundsException extends Exception{


    private double missingAmount;

    InsufficientFundsException(double missingAmount){

         super("Insufficient balance. Need " + missingAmount);

        this.missingAmount = missingAmount;
      }

    double getMissingAmount() {
            return missingAmount;
     }
}

class BankAccount {
    
    private double balance;

    BankAccount(double balance) {

         this.balance = balance;
    }

    
    void withdraw(double amount) throws InsufficientFundsException{

        if(amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than zero");
        }

        if(amount > balance){
            throw new InsufficientFundsException(amount - balance);
        }

        balance -= amount;
        System.out.println("New balance after withdrawal : $" + balance);
    }
}

public class main{

    public static void main(String[] args){
        BankAccount ba = new BankAccount(500);

        try {
             ba.withdraw(900);
        }


        catch(InsufficientFundsException inn){

             System.out.println(inn.getMessage());
            System.out.println("Missing Amount : $" + inn.getMissingAmount());
        }

        catch(IllegalArgumentException e){
            System.out.println(e.getMessage());
        }
    }
}