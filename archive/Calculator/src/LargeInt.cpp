/*
 * LargeInt.cpp
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#include "LargeInt.h"
#include <string>
#include <iostream>
#include "Sequence.h"
using namespace std;

LargeInt::LargeInt(int n) : value(n){
	if (trace) cout<<"Created an empty LargeInt of size "<<n<<endl;

}


LargeInt::LargeInt(char* characterInput):value(characterInput){

	if (trace)cout<<"Creating a largeint"<<endl;
	//if declared here rather than above in intialization list, the result is a local variable which is pretty useless.
	//Sequence value2(characterInput);
}
LargeInt::LargeInt(const LargeInt & source): value(source.value){
	if (trace) cout<<"Copying a  large int to a new one"<<endl;
}

LargeInt& LargeInt::operator =(const LargeInt & source){
	if (trace) cout<<"Assigning a  large int to a previously initialized large int"<<endl;
	if (this != &source){
		value  = source.value;
	}
	return *this;
}

LargeInt& LargeInt::Add( LargeInt &input){
	int temp = input.getSize();
	if (trace) cout<<endl<<"Checking the size of the accumulator..."<<getSize()<<
			"\nChecking the size of the input...\t\t"<<input.getSize()<<endl;
	if (trace) cout<<endl<<"Checking the originalstring of the accumulator..."<<getOriginalString()<<
				"\nChecking the originalstring of the input...\t\t"<<input.getOriginalString()<<endl;

	char* holder = value.getAsString();
	char* anotherHolder = input.value.getAsString();
	cout<<"Adding \n " <<holder<<endl<<"+"<<anotherHolder<<endl;


	int maxsize = 0;
	Sequence x;
	Sequence y;
	//copy the values of the two operands into holders x (longer) and y (shorter)
	if ( input.getSize() > getSize() ){
		if (trace) cout<<"The input is longer than the accumulator."<<endl;
		maxsize = input.getSize();
		 x = input.value;
		 y = value;
	}else {
		if (trace) cout<< "The accumulator is longer than the input."<<endl;
		maxsize = getSize();
		 x = value;
		 y = input.value;
	}


	LargeInt result(x.getSize()+1);

	int carry=0;
	//for the places starting at zero, going until the size of the smaller operand
	for(int i=1; i<=y.getSize();i++){
		if (trace) cout<<"Adding "<<x.getElement(x.getSize()-i)<< " to "<<y.getElement(y.getSize()-i)<<endl;

		//calculate the addition in that position
		carry = x.getElement(x.getSize()-i) + y.getElement(y.getSize()-i);

		if(carry>baseSystem){
				if (trace) cout<<"In this base system ("<<baseSystem<<") The addition of "<<x.getElement(x.getSize()-i)<<"+"<<y.getElement(y.getSize()-i)<<" results in a carry, here is the value: "<<carry<<endl;
				//put the remainder into this position of the result
				result.value.setElement(result.getSize()-i, carry-baseSystem);

				//add one to the position to the left
				int plusOne = 0;
				plusOne =x.getElement(x.getSize()-i)+1;

				int keepCarrying=0;
				//while the plusone is too big to fit in the position, send the carry further along to a higher position in x
				while(plusOne>baseSystem && (x.getSize()-keepCarrying-i > 0) )
				{
					if (trace) cout<<"Need to carry to the next position to the left."<<endl;
					//put the remainder into the postion higher to the left
					x.setElement(result.getSize()-i-keepCarrying, plusOne-baseSystem);
					if (trace) cout<<"\t Now x looks like this: "<<x.getAsString()<<endl;

					//carry again, add one to the next higher position
					plusOne = x.getElement(x.getSize()-i-keepCarrying-1)+1;//move over to the left one spot each iteration
					if (trace) cout<<"\t\t New carry: "<<plusOne<<endl;

					//increment the number of times you carried
					keepCarrying++;
				}

				//if on the last position of x, put the carry into the result instead of putting it in x.
				if( plusOne<baseSystem && x.getSize()-keepCarrying-i <= 0 ){
					result.value.setElement(0, plusOne); //remove the base system from the carry eg, if the carry is 13 and base is 10, then its 13-13=3
					if(trace) cout<<"Putting the carry into the extra digit of the result (created for this purpose) result is currently:"<<result.getAsStringy()<<endl;
				}else{
					x.setElement(x.getSize()-i-keepCarrying-1, plusOne);//equivalent to x.store[size-i+1]+=1; //add 1 to the higher place in the x, to be used in the next itteration of addition
					if (trace) cout<<"Done carrying the result of this addition, \nCarried "<<keepCarrying
							<<" times. Putting the carry into the next higher position to the left in x."<<endl;
				}
		}else{
				result.value.setElement(result.getSize()-i, carry);
		}
		if(trace) cout<<"This is the new value in the "<<i-1<<" place: "<<result.value.getElement(result.getSize()-i)<<endl;
	}

	//for the higher digits of the longer opperand, copy the digits.
	for(int k=y.getSize()+1; k<=x.getSize(); k++)
	{
		//TBD if the element is bigger thanthe carry, carry again.
		result.value.setElement( result.getSize()-k , x.getElement(x.getSize()-k) );
		if (trace) cout<<"Just copying "<<x.getElement(x.getSize()-k)<< " (should match "<< result.value.getElement(result.getSize()-k)<<") to place "<<k-1<<endl;

	}

	//if the extra place value is not needed, set it to 0
	result.value.setElement(0, 0);


	cout<<"="<<result.getAsStringy()<<endl;

	return result;//question, why isnt this *result


}//end add

//LargeInt::LargeInt() {
	// TODO Auto-generated constructor stub

//}

LargeInt::~LargeInt() {


	// TODO Auto-generated destructor stub
}

int LargeInt::getSize(){
	return value.getSize();

}

char* LargeInt::getOriginalString(){
	return value.getOriginalString();
}

char* LargeInt::getAsStringy(){
	return value.getAsString();
}
