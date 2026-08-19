interface Drivable 
{
    void drive();
}

class Vechicle {
    String brand;

    int speed;

    Vechicle(String brand, int speed) {
        this.brand =brand;
        this.speed = speed;
    }

    Vechicle() {
    }

    void move() {
         System.out.println("Moving");
    }
}

class Car extends Vechicle implements Drivable
 {
    int seats;

    Car() {
        seats = 0;
     }

    Car(int seats, String brand, int speed) {
         super(brand, speed);
        this.seats = seats;
    }

    @Override
    public void drive()
     {
         System.out.println("Driving");
    }

    void display() {

        System.out.println("Seats : " + seats);

        System.out.println("Brand : " + brand);
         System.out.println("Speed : " + speed);
    }
    public static void main(String[] args) {

        Car c = new Car(5, "BMW", 80);
    
         c.display();
        c.move();
        c.drive();
    }
}
