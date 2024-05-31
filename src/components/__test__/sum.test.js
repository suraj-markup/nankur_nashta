import { sum } from "../sum";

test("sum funtion calculate the sum of two integers",()=>{
        const result=sum(3,4);
        expect(result).toBe(7);
});