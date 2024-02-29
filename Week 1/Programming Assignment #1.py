#Solution : 8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184
def integer_multiplication(x, y):
    # because it's multiplication of only one-digit numbers, we can use int
    x_int = int(x)
    y_int = int(y)
    result = str(x_int * y_int)
    return result

# pass by reference so we can make changes instantly and not copy the string
def put_zero(num, n):
    for _ in range(n):
        num += "0"

def combine(str1, str2):
    result = ""

    # We make sure str2 is longer
    if len(str1) > len(str2):
        str1, str2 = str2, str1  # Swap using tuple unpacking

    n1 = len(str1)
    n2 = len(str2)

    carry = 0
    j = n2 - 1

    for i in range(n1 - 1, -1, -1):
        _sum = int(str1[i]) + int(str2[j]) + carry
        result += str(_sum % 10)
        j -= 1
        carry = _sum // 10

    for _ in range(j, -1, -1):
        _sum = int(str2[j]) + carry
        result += str(_sum % 10)
        carry = _sum // 10

    if carry != 0:
        result += str(carry)

    return result[::-1]

def karatsuba(x, y, n):
    if n != 1:
        a = x[:n // 2]
        b = x[n // 2:]
        c = y[:n // 2]
        d = y[n // 2:]

        ac = karatsuba(a, c, n // 2)
        bd = karatsuba(b, d, n // 2)
        ad = karatsuba(a, d, n // 2)
        bc = karatsuba(b, c, n // 2)

        ad_plus_bc = combine(ad, bc)

        put_zero(ac, n)
        put_zero(ad_plus_bc, n // 2)

        result = combine(combine(ac, ad_plus_bc), bd)
        return result

    else:
        return integer_multiplication(x, y)

# Assuming input is read from a file or another source
x = "123"  # replace with actual value
y = "456"  # replace with actual value

print("x \t= " + x)
print("y \t= " + y)
print("")

print("Karatsuba Multiplication : " + karatsuba(x, y, len(x)))

