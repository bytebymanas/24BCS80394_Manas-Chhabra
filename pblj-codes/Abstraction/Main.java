abstract class Shape{

    abstract double calculateArea();

    void display()
    {
       
        System.out.println("This is a  shape");
    }
}
class Circle extends Shape {
    double radius ;
    Circle(double radius){

        this.radius  = radius;
     }

    @Override

    double calculateArea() {
        return (3.14* radius*radius);
     }

}
class Rectangle extends Shape{
    double length ; 
    double width ; 

    Rectangle(double length, double width){
         this.length =length;
        this.width =width;
    }

    @Override

    double calculateArea() {
         return (length*width);
    }
}
public class Main {
    public static void main(String[] args) 
    {
         Circle c1 = new Circle(1);
        Rectangle r1 = new Rectangle(1, 1);

        c1.display();
        r1.display();

        System.out.println(c1.calculateArea());
         System.out.println(r1.calculateArea());
    }
}
