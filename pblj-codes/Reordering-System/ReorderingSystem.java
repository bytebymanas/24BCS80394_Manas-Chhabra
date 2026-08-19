import java.sql.Array;
import java.util.*;

public class ReorderingSystem {
    static void main(String[] args) {

        Scanner inn = new Scanner(System.in);
        ArrayList<ArrayList<Integer>> inventory = new ArrayList<>();
        for(int i = 0 ; i<3 ; i++){
            ArrayList<Integer> section = new ArrayList<>();
            for(int j = 0 ; j<3 ; j++){
                int val = inn.nextInt();
                section.add(val);
            }
            inventory.add(section);
        }

        inn.close();

        LinkedList<Integer> list = new LinkedList<>();

        for(int i = 0; i < inventory.size() ; i++)
            {
            for(int j = 0; j< inventory.get(i).size() ; j++){
                if(inventory.get(i).get(j) < 5){
                    list.addLast(2*(inventory.get(i).get(j)));
                }
            }
        }   

        System.out.println(inventory);
        System.out.println(list);

    }
}
